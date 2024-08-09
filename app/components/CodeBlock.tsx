import { Suspense } from 'react';
import {rehype} from 'rehype';
import rehypeHighlight from 'rehype-highlight'

type CodeBlockParams = {
    code: string,
    language: string,
}

async function ParseCode({language, code}: CodeBlockParams) {
  const content = await rehype()
  .data('settings', {fragment: true})
  .use(rehypeHighlight)
  .process(`<pre><code className="${language} codeBlock">${code}</code></pre>`);
  
  return (<div dangerouslySetInnerHTML={{ __html: String(content) }}></div>
  );
}

export default function CodeBlock({code, language}: CodeBlockParams) {
    return (
      <Suspense fallback={<p className='animate-pulse w-fit mx-auto text-2xl'>Loading Code...</p>}>
        <ParseCode language={language} code={code} />
      </Suspense>
    );
  }