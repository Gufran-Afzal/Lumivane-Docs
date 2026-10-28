(function(){
var d=document,b=d.body;
var m=d.querySelector('.menu');if(m)m.addEventListener('click',function(){var o=b.classList.toggle('nav-open');m.setAttribute('aria-expanded',o)});
d.querySelectorAll('.nav a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('nav-open')})});
var mode=d.querySelector('.mode');if(mode)mode.addEventListener('click',function(){var r=d.documentElement,cur=r.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),n=cur==='dark'?'light':'dark';r.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}});
// copy buttons
d.querySelectorAll('pre').forEach(function(p){var c=d.createElement('button');c.className='copy';c.type='button';c.textContent='Copy';c.addEventListener('click',function(){var t=p.innerText.replace(/Copy$/,'').trim();(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){c.textContent='Copied';setTimeout(function(){c.textContent='Copy'},1500)}).catch(function(){})});p.appendChild(c)});
// search
var q=d.getElementById('q'),r=d.getElementById('results');
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function run(){var v=q.value.trim().toLowerCase();if(v.length<2){r.hidden=true;return}
var w=v.split(/\s+/),out=[];(window.DOCS||[]).forEach(function(p){var t=p.t.toLowerCase(),x=p.x.toLowerCase(),s=0;w.forEach(function(k){if(t.indexOf(k)>-1)s+=10;if(x.indexOf(k)>-1)s+=1});if(s>0)out.push([s,p])});
out.sort(function(a,b){return b[0]-a[0]});
r.innerHTML=out.length?out.slice(0,7).map(function(o){var p=o[1],i=p.x.toLowerCase().indexOf(w[0]),sn=i>-1?p.x.substr(Math.max(0,i-40),110):p.x.substr(0,100);return '<a href="'+p.u+'"><strong>'+esc(p.t)+'</strong><small>'+esc(p.g)+'</small><span>'+esc(sn)+'…</span></a>'}).join(''):'<p>No results. Try another word.</p>';r.hidden=false}
if(q){q.addEventListener('input',run);q.addEventListener('focus',run);d.addEventListener('click',function(e){if(!e.target.closest('.search'))r.hidden=true});d.addEventListener('keydown',function(e){if(e.key==='/'&&d.activeElement!==q&&!/input|textarea/i.test(d.activeElement.tagName)){e.preventDefault();q.focus()}if(e.key==='Escape'){r.hidden=true;q.blur()}})}
// support form
var f=d.getElementById('form');if(f){var id=window.SUPPORT_FORM_ID;if(!id){f.innerHTML='<div class="callout warning"><strong>The support form is not connected yet.</strong> The owner needs to add the form ID in <code>config.js</code>.</div>'}else{var i=d.createElement('iframe');i.src='https://tally.so/embed/'+id+'?alignLeft=1&hideTitle=1&dynamicHeight=1';i.title='Contact support';i.loading='lazy';i.style.cssText='width:100%;height:780px;border:0';f.appendChild(i)}}
// highlight current toc link
var links=[].slice.call(d.querySelectorAll('.toc a'));if(links.length&&'IntersectionObserver'in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'0px 0px -75% 0px'});d.querySelectorAll('.doc h2[id]').forEach(function(h){io.observe(h)})}
})();
