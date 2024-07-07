import { useEffect, useState } from 'react';
import rehypeStarryNight from 'rehype-starry-night' // TODO look at different options
import {rehype} from 'rehype';

type CodeBlockParams = {
    code: string,
    language: string,
}

export default function CodeBlock({code, language}: CodeBlockParams) {
    const [content, setContent] = useState<string>('<></>');
  
    useEffect(() => {
      rehype()
      .data('settings', {fragment: true})
      .use(rehypeStarryNight)
      .process(`<pre><code className="${language}">${code}</code></pre>`).then((c: any) => {
        console.log(String(c));
        setContent(String(c));
      })
    }, []);
  
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  }