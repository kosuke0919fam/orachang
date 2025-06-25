hexo.extend.tag.register('quote', function(args) {
  const slug = args.find(arg => arg.startsWith('slug:'))?.split(':')[1];
  const parts = args.find(arg => arg.startsWith('part:'))?.split(':')[1]?.split(',') || [];

  const post = hexo.locals.get('posts').toArray().find(p => p.slug === slug);
  if (!post) return '<div>引用元が見つかりません</div>';

  const quoteLines = parts.map(p => `<p>（レス${p}）${post.content}</p>`).join('\n');
  const note = post.quote_note || '→ 引用元を見る';
  const permalink = post.permalink || `/posts/${slug}/`;

  return `<div class="quote-block">\n${quoteLines}\n<div class="quote-citation"><a href="${permalink}">${note}</a></div>\n</div>`;
});
