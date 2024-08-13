import { Suspense } from 'react';
import {rehype} from 'rehype';
//@ts-ignore
import rehypeMathjax from 'rehype-mathjax';

type MathBlockParams = {
    math: string,
}

async function ParseMath({math}: MathBlockParams) {
  const content = await rehype()
  .data('settings', {fragment: true})
  .use(rehypeMathjax)
  .process(`<code class="language-math">${math}</code>`);

  return (<div className='math-div' dangerouslySetInnerHTML={{ __html: String(content) }}></div>
  );
}

export default function MathBlock({math}: MathBlockParams) {
    return (
      <Suspense fallback={<p className='animate-pulse w-fit mx-auto text-2xl'>Loading Code...</p>}>
        <ParseMath math={math} />
      </Suspense>
    );
  }