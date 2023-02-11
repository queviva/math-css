

const log = console.log;

(async () => { await document.fonts.ready;

const reg1 = new RegExp(/(\w)\*\*([^\(\[\<\s]+?)(=?\s|$)/g);
const reg2 = new RegExp(/(\w)\*\*([\(\[)].+?[\)\]])/g);
const reg3 = new RegExp(/(\w)\*\*(\<(.*?)\>.*?\<\/\3\>)/g);
const NS = 'http://www.w3.org/2000/svg';

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
        path = document.createElementNS(NS, 'path')
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
document.querySelectorAll('[data-line]').forEach(
    (
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
            const tarLineSize = (parseFloat(tar.dataset.lineSize)||1)*100;
            const tarLineDir = 2*Math.PI*(parseFloat(tar.dataset.lineDir)||90)/360;
            const tarRect = tar.getBoundingClientRect();
            const path = document.createElementNS(NS, 'path');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'var(--lightness)');
            path.setAttribute('stroke-width', '3');
            const left1 =
                -svgRect.left + objRect.left + objRect.width/2;
            const left2 =
                -svgRect.left + tarRect.left + tarRect.width/2;
            const d = `\
M${left1} \
 ${objRect.top} \
C${left1+(
    (lineSize[i]||lineSize[0])*Math.cos(lineDir[i]||lineDir[0])
 )} \
 ${objRect.top-(
    (lineSize[i]||lineSize[0])*Math.sin(lineDir[i]||lineDir[0])
 )} \
 ${left2      +(tarLineSize*Math.cos(tarLineDir))} \
 ${tarRect.top-(tarLineSize*Math.sin(tarLineDir))} \
 ${left2} \
 ${tarRect.top}`;
            path.setAttribute('d', d);
            svg.append(path);
            const cirk = document.createElementNS(NS,'circle');
            cirk.setAttribute('cx', left2);
            cirk.setAttribute('cy', tarRect.top);
            cirk.setAttribute('r', 5);
            svg.append(cirk);
            
        })
    }
);
//}
 
   
})();