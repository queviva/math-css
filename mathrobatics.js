

const log = console.log;

(async () => { await document.fonts.ready;

const reg1 = new RegExp(/(\w)\*\*([^\(\[\<\s]+?)(=?\s|$)/g);
const reg2 = new RegExp(/(\w)\*\*([\(\[)].+?[\)\]])/g);
const reg3 = new RegExp(/(\w)\*\*(\<(.*?)\>.*?\<\/\3\>)/g);
const NS = 'http://www.w3.org/2000/svg';
const sin = Math.sin;
const cos = Math.cos;
const nsp = () => document.createElementNS(NS, 'path');

// exponent short ** {
document.querySelectorAll('.mathrobatics b').forEach(b => {
    
    if (b.innerHTML.match(/\*\*/)) {
        b.innerHTML = b.innerHTML
        .replace(reg1,'$1<sup>$2</sup>')
        .replace(reg2,'$1<sup>$2</sup>')
        .replace(reg3,'$1<sup>$2</sup>')
        .replace(/\\\*\*/g, '**');
    }
    
});
//}

// i-arc {
document.querySelectorAll('i-arc').forEach(
    (
        obj, idx, j,
        high,
        kidz = [],
        dset = obj.dataset,
        dist = void 0 !== dset.dist,
        rite = void 0 !== dset.rite,
        cirk = void 0 !== dset.cirk,
        size = parseInt(dset.size) || 10,
        min  = parseInt(dset.min) || 20,
        dif  = parseInt(dset.dif) || 15,
        val  = obj.children[0],
        txt  = val.innerText,
        svg  = document.createElementNS(NS, 'svg'),
        path = nsp()
    ) => {
        val.classList.add(dist ? 'iarc-dist' : 'iarc-fakt');
        val.innerText = txt;
        obj.parentNode.insertBefore(
           val, rite ? obj.nextSibling : obj
        );
        !dist ||  val.parentNode.insertBefore(
            document.createElement('g-t'),
            rite ? val : val.nextSibling
        );
        kidz = cirk ? [...obj.querySelectorAll('c-irk')]
            .sort((a, b) =>
                a.getBoundingClientRect().left -
                b.getBoundingClientRect().left
        ) : [...obj.children];
        
        !dist || (kidz = kidz.map(c => {
            let f = document.createElement('b');
            f.innerText = '\u00d7' + txt;
            f.classList.add('iarc-dist-lil');
            obj.insertBefore(f, c.nextSibling);
            return f;
        }));
        high = min + dif * kidz.length - 1;
        obj.style.marginTop = high + 'px';
        svg.append(path);
        obj.append(svg);
        let Rec = {
            obj: obj.getBoundingClientRect(),
            val: val.getBoundingClientRect()
        }
        const wide = Math.abs(
            rite ?
            Rec.val.right - Rec.obj.left :
            Rec.val.left - Rec.obj.right
        );
        svg.style.width  = wide + 'px';
        svg.style.height = high + 'px';
        rite ? svg.style.left = 0 : svg.style.right = 0;
        Rec.svg = svg.getBoundingClientRect();
        path.setAttribute('d', (rite ? kidz : kidz.reverse())
        .map((k, i) => {
            let kidRect = k.getBoundingClientRect(),
            
            origin = rite ?
                [(kidRect.left + kidRect.width / 2 -
                Rec.obj.left), high]:
                [Rec.val.width / 2, high],
            target = rite ?
                [Rec.svg.width -
                Rec.val.width / 2, high]:
                [(kidRect.left + kidRect.width / 2 -
                Rec.val.left), high],
            rad = {
                x: Math.abs(origin[0] - target[0]) / 2,
                y: high - dif * i
            };
            return `M ${ origin.join(' ') } A ${rad.x} ${rad.y} 0 0 1 ${ target.join(' ') } h ${(dist&&!rite)||(!dist&&rite)?-size:-1} A ${rad.x-size-1 } ${rad.y *((rad.x-size-1)/rad.x) } 0 0 0 ${ origin[0] + ((dist&&!rite)||(!dist&&rite)?1:size)} ${ high } Z`;
        }).join('') );
    }
);
//}

// [data-line] {
document.querySelectorAll('[data-line]').forEach((
    obj, idx, j,
    dset = obj.dataset,
    target = dset.line,
    lineDir = (dset.lineDir||'90').split(',').map(
        v=>2*Math.PI*Number(v)/360),
    lineSize = (dset.lineSize||'1').split(',').map(
        v=>Math.abs(100*Number(v))),
    svg  = document.createElementNS(NS, 'svg'),
) => {
    svg.classList.add('svg-line');
    obj.parentNode.append(svg);
    svgRect = svg.getBoundingClientRect();
    objRect = obj.getBoundingClientRect();
    obj.parentNode.querySelectorAll(target)
    .forEach((tar, i) => {
        const tarLineSize = (parseFloat(tar.dataset.lineSize) || 1) * 100;
        const tarLineDir = 2 * Math.PI * (parseFloat(tar.dataset.lineDir) || 90) / 360;
        const tarRect = tar.getBoundingClientRect();
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'var(--lightness)');
        path.setAttribute('stroke-width', '3');
        const left1 = objRect.left + objRect.width / 2
                    - svgRect.left;
        const left2 = tarRect.left + tarRect.width / 2
                    - svgRect.left;
        const d = `\
M${left1} \
${-svgRect.top + objRect.top} \
C${left1+(
    (lineSize[i]||lineSize[0])*cos(lineDir[i]||lineDir[0])
)} \
${-svgRect.top + objRect.top-(
    (lineSize[i]||lineSize[0])*sin(lineDir[i]||lineDir[0])
)} \
${left2      +(tarLineSize*cos(tarLineDir))} \
${-svgRect.top + tarRect.top-(tarLineSize*sin(tarLineDir))} \
${left2} \
${-svgRect.top + tarRect.top}`;
        path.setAttribute('d', d);
        svg.append(path);
        const cirk = document.createElementNS(NS, 'circle');
        cirk.setAttribute('cx', left2);
        cirk.setAttribute('cy', -svgRect.top + tarRect.top);
        cirk.setAttribute('r', 5);
        svg.append(cirk);
    })
});
//}
 
// g-eom {
document.querySelectorAll('g-eom').forEach((
    obj, idx, j,
    dset = obj.dataset,
    svg = document.createElementNS(NS, 'svg'),
    wide = (parseInt(dset.wide) || 100),
    high = (parseInt(dset.high) || 100),
    type = (dset.type || 'cyl').replace(/-/g,'_')
) => {
    obj.style.width  = wide + 'px';
    obj.style.height = high + 'px';
    obj.append(svg);
    ({
        tri_rite: () => {
            
            const theta = Math.atan(high/wide);
            const phi   = Math.atan(wide/high);
            const len   = Math.sqrt(wide*wide+high*high);
            const pi2   = Math.PI/2;
            const opt1  = void 0 !== dset.opt1;
            const opty  = parseInt(
                (Object.entries(dset).join('')
                .match(/opt\d+/)||['opt0'])[0]
                .match(/\d+/)[0]
            );
            
            const lines = void 0 !== dset.drawlines;
            let a1, a2, b, h, hyp;
            
            const optArrow1 = //{
            `M0 0l5 30l2 -28l-3 32m20 -10l-21 -5l17 -6l-21 5l17 6l-16 -7l${Math.max(.25*wide, 55)} -2`;
            //}
            
            const optArrow2 = //{
            `M0 0l3 30l-2 -27l-3 33m-20 -10l21 -5l-17 -8l23 7l-17 7l16 -8l${-1*Math.max(.25*wide, 55)} -2`;
            //}
            
            const makeLines = {
                shape: [
                    () => {
    const p = nsp();
    p.classList.add('shape');
    p.setAttribute('d',`M0 ${high}H${wide}V0Z`);
    svg.prepend(p);
                    },
                    () => {
    const p = nsp();
    p.setAttribute('d',
        `M -10 ${high}Q${wide/2} ${high-5} ${wide+14} ${high+2}l10 10Q${wide/2} ${high-5} -20 ${high+10}zM -10 ${high+15}Q${10 + wide/2} ${10 + high/2} ${wide+15} ${-10}l5 13Q${10 + wide/2} ${10 + high/2} ${0} ${high+20}zM ${wide+12} ${-20}Q${wide-10} ${high/2} ${wide+10} ${high+25}l-5 13Q${wide-10} ${high/2} ${wide} ${-7}`);
    svg.prepend(p);
                    }
                ],
                square: [
                    () => {
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d', `M${wide-20} ${high} v-20 h20`);
    svg.prepend(p);
                    },
                    () => {
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d',`M${wide-20} ${high}l-1 -20 l24 1l-26 2l4 18`);
    svg.prepend(p);
                    }
                ],
                a1: [
                    () => {
    const len = parseInt(a1.dataset.size) || wide/5;
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d', `M${len} ${high}A ${len} ${len} 0 0 0 ${len*cos(-theta)} ${high+len*sin(-theta)}`);
    svg.prepend(p);
                    },
                    () => {
    const len = parseInt(a1.dataset.size) || wide/5;
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d', `M${len} 0A ${len} ${len} 0 0 0 ${len*cos(-theta)} ${len*sin(-theta)}A ${len} ${len} 0 0 1 ${len+3} 13A ${len} ${len} 0 0 0 ${8+len*cos(-theta)} ${3+len*sin(-theta)}`);
    p.setAttribute('transform',
        'translate(' + 0 + ' ' + high + ')'
    );
    svg.append(p);
                        
                    }
                ],
                a2: [
                    () => {
    const len = parseInt(a2.dataset.size) || high/5;
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d',
        `M${wide} ${len} A ${len} ${len} 0 0 1 ${wide-len*cos(theta)} ${len*sin(theta)}`
    );
    svg.prepend(p);
                    },
                    () => {
    const len = parseInt(a2.dataset.size) || high/5;
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d', `M0 ${len}A${len} ${len} 0 0 1 ${-len*cos(theta)} ${len*sin(theta)}A${len} ${len} 0 0 0 ${8} ${len+5}A${len} ${len} 0 0 1 ${-4-len*cos(theta)} ${len*sin(theta)}`);
    p.setAttribute('transform',
        'translate(' + wide + ' ' + 0 + ')'
    );
    svg.append(p);
                    }
                ],
                b: [
                    () => {
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d',
        `M0 ${high+10}H${wide}`
    );
    svg.append(p);
                    },
                    () => {
    const p1 = nsp();
    p1.classList.add('measureline');
    p1.setAttribute('d', optArrow1);
    p1.setAttribute(
        'transform',
        'translate(' + -10 +' '+ (high + 15) +')'
    );
    svg.append(p1);
    const p2 = nsp();
    p2.classList.add('measureline');
    p2.setAttribute('d', optArrow2);
    p2.setAttribute(
        'transform',
        'translate(' + wide + ' ' + (high + 15) + ')'
    );
    svg.append(p2);
                    }
                ],
                h: [
                    () => {
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d',
        `M${wide+10} 0V${high}`
    );
    svg.append(p);
                    },
                    () => {
    const p1 = nsp();
    p1.classList.add('measureline');
    p1.setAttribute('d', optArrow1);
    p1.setAttribute(
        'transform',
        'translate(' + (wide+15) +' '+ (high + 10) +')' +
        'rotate(-90)'
    );
    svg.append(p1);
    const p2 = nsp();
    p2.classList.add('measureline');
    p2.setAttribute('d', optArrow2);
    p2.setAttribute(
        'transform',
        'translate(' + (wide+15) + ' ' + -5 + ')' +
        'rotate(-90)'
    );
    svg.append(p2);
                    }
                ],
                hyp: [
                    () => {
    const p = nsp();
    p.classList.add('measureline');
    p.setAttribute('d',
        `M${10*cos(pi2 + theta)} ${high - 10*sin(pi2 + theta)}L${wide + 10*cos(pi2 + theta)} ${-10*sin(pi2 + theta)}`
    );
    svg.append(p);
                    },
                    () => {
    const p1 = nsp();
    p1.classList.add('measureline');
    p1.setAttribute('d', optArrow1);
    p1.setAttribute(
        'transform',
        'translate('+
            ((30 * cos(pi2 + theta)))
            +' '+
            (high - (30 * sin(pi2 + theta)))
        +')' +
        'rotate('+ (360 * -theta/(2*Math.PI)) +')'
    );
    svg.append(p1);
    const p2 = nsp();
    p2.classList.add('measureline');
    p2.setAttribute('d', optArrow2);
    p2.setAttribute(
        'transform',
        'translate(' +
            (wide + 30 * cos(pi2 + theta))
            + ' ' +
            (-30 * sin(pi2 + theta))
        + ')' +
        'rotate('+ (360 * -theta/(2*Math.PI)) +')'
    );
    svg.append(p2);
                    }
                ]
            };
            
            makeLines.shape[opty]();
            makeLines.square[opty]();

            if (a1 = obj.querySelector('a-1')) {
                a1.innerHTML || (a1.innerHTML = '&theta\;');
                if (lines || void 0 === a1.dataset.noline)
                    makeLines.a1[opty]();
                let len = parseInt(a1.dataset.size) || wide/5;
                a1.style.top = high - (len+10) * sin(theta/2)
                    - a1.offsetHeight/2 +'px';
                a1.style.left = (len+10) * cos(theta/2) + 'px';
            }
            
            if (a2 = obj.querySelector('a-2')) {
                a2.innerHTML || (a2.innerHTML = '&phi\;');
                if (lines || void 0 === a2.dataset.noline)
                    makeLines.a2[opty]();
                let len = parseInt(a2.dataset.size) || high/5;
                let adj = parseInt(
                    window.getComputedStyle(a2).fontSize
                );
                
                if (!a2.innerHTML) a2.innerHTML = '&phi\;';
                a2.style.top = (len+20) * sin(
                    pi2 - phi/2
                ) - a2.offsetHeight/2 +'px';
                a2.style.right = (len+20) * cos(
                    pi2 - phi/2
                ) - adj/2 + 'px';
            }

            if (b = obj.querySelector('b-b')) {
                b.innerHTML || (b.innerHTML = 'b');
                if (lines || void 0 !== b.dataset.drawline)
                    makeLines.b[opty]();
            }
            if (h = obj.querySelector('h-h')) {
                h.innerHTML || (h.innerHTML = 'h');
                if (lines || void 0 !== h.dataset.drawline)
                    makeLines.h[opty]();
                h.style.height = high + 'px';
            }
            if (hyp = obj.querySelector('h-yp')) {
                hyp.innerHTML || (hyp.innerHTML = 'hyp');
                if (lines || void 0 !== hyp.dataset.drawline)
                    makeLines.hyp[opty]();
                if (
                    hyp.innerText.length < 4 ||
                    void 0 !== hyp.dataset.noturn
                ) {
                    hyp = hyp.style;
                    hyp.width = 'auto';
                    hyp.padding = '10px';
                    hyp.bottom = high/2 + 'px';
                    hyp.right = wide/2 + 'px';
                } else {
                    hyp = hyp.style;
                    hyp.width = (len + 10) + 'px';
                    hyp.transform = 'rotate(' + -theta + 'rad)';
                
                    hyp.paddingBottom = '5px';
                    hyp.left = 10 * cos(theta + pi2) +
                        'px';
                    hyp.bottom = 10 * sin(theta + pi2) +
                        'px';
                }
            }
            
        },
        sphere: () => {},
        cyl: () => {
            const top = 0.15 * wide;
            const mid = 0.5  * wide;
            const cen = 0.5  * high;
            const bot = high - top;
            let shape = nsp();
            shape.setAttribute('d', `M0 ${top+10}  Q4 ${cen} 0 ${bot}  A${mid} ${top} 0 0 0 ${wide} ${bot}  Q${wide-8} ${cen} ${wide} ${top}  A${mid} ${top} 0 1 0  ${mid+mid*cos(-1.68*Math.PI)}  ${top+top*sin(-1.68*Math.PI)}  L${mid+((mid-5)*cos(-1.8*Math.PI))}  ${top+((top-3)*sin(-1.8*Math.PI))}  A${mid-5} ${top-3} 0 1 1 ${wide-5} ${top}  Q${wide-10} ${cen} ${wide-5} ${bot-2}  A${mid-10} ${top-5} 0 1 1 5 ${bot-2}  Q 8 ${cen} 4 ${top+18}Z`);
            svg.prepend(shape);
            
            const lips = document.createElementNS(NS, 'ellipse');
            lips.setAttribute('cx', mid);
            lips.setAttribute('cy', .14  * wide);
            lips.setAttribute('rx', .04  * wide);
            lips.setAttribute('ry', .015 * wide);
            svg.append(lips);
            
            let h, r, d, t;
            const kidz = Array.from(obj.children);

            if (h = kidz.find(v => v.tagName === 'H-H')) {
                if (!h.innerHTML) h.innerHTML = 'h';
                h = h.style;
                h.bottom = top + 'px';
                h.right = (wide + 8) + 'px';
                h.height = (high - .3 * wide) + 'px';
            }
            
            if (r = kidz.find(v => v.tagName === 'R-R')) {
                if (!r.innerHTML) r.innerHTML = 'r';
                r.style.bottom = 'calc(100% - ' +
                                  top + 'px + 1.7em)';
            }
            
            if (d = kidz.find(v => v.tagName === 'D-D')) {
                if (!d.innerHTML) d.innerHTML = 'd';
                d.style.bottom = 'calc(100% - ' +
                                  top + 'px + 3em)';
            }
                        
            if (t = kidz.find(v => v.tagName === 'T-ANK')) {
                
                let fil =  bot - ((parseFloat(t.dataset.fill) || 75)/100) * (bot-top);
                
                let shade = nsp();
                shade.classList.add('tankshade');
                shade.setAttribute('d', `M10 ${fil}V${bot-5}A${mid-20} ${top-8} 0 0 0 ${wide-10} ${bot-5}V${fil}A${mid-20} ${top-10} 0 0 1 10 ${fil}Z`);
                svg.prepend(shade);
                
                let stuff = nsp();
                stuff.classList.add('tankstuff');
                stuff.setAttribute('d', `M10 ${fil}V${bot-5}A${mid-20} ${top-8} 0 0 0 ${wide-10} ${bot-5}V${fil}A${mid-20} ${top-10} 0 0 0 10 ${fil}Z`);
                svg.prepend(stuff);
                
                let th, tr, td;
                if (th = t.querySelector('h-h')) {
                    th.innerHTML || (th.innerHTML = 'h\'');
                    th.style.height = high - 5 - top - fil + 'px';
                    th.style.bottom = top + 5 + 'px';
                }
                if (tr = t.querySelector('r-r')) {
                    tr.innerHTML || (tr.innerHTML = 'r\'');
                    tr.style.bottom = 'calc(100% - ' +
                                fil +'px + 1.7em)';
                }
                if (td = t.querySelector('d-d')) {
                    td.innerHTML || (td.innerHTML = 'd\'');
                    td.style.bottom = 'calc(100% - ' +
                                fil +'px + 2.7em)';
                }
                
            }
            
        }
    }[type])()
    
});
//}
   
})();