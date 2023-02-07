
(async () => { await document.fonts.ready;
document.querySelectorAll('i-arc').forEach(
    (
        obj, i, j, NS = 'http://www.w3.org/2000/svg',
        valu = obj.children[0],
        text = valu.innerText,
        dset = obj.dataset,
        dist = void 0 !== dset.dist,
        rite = void 0 !== dset.rite,
        min  = parseInt(dset.min) || 15,
        dif  = parseInt(dset.dif) || 10,
        high = min + dif * (obj.children.length - 1),
        kidz = [], d = ''
    ) => {
        const svg = document.createElementNS(NS, 'svg');
        const path = document.createElementNS(NS, 'path');
        svg.append(path);
        valu.classList.add(dist ? 'iarc-dist' : 'iarc-fakt');
        valu.innerText = text;
        obj.parentNode.insertBefore(
           valu, rite ? obj.nextSibling : obj
        );
        obj.style.marginTop = high + 'px';
        !dist ||  valu.parentNode.insertBefore(
            document.createElement('g-t'),
            rite ? valu : valu.nextSibling
        );
        kidz = dist ? [...obj.children].map(c => {
            let f = document.createElement('b');
            f.innerText = '\u00d7' + text;
            f.classList.add('iarc-dist-lil');
            obj.insertBefore(f, c.nextSibling);
            return f;
        }) : [...obj.children];
        obj.append(svg);
        const objRect = obj.getBoundingClientRect();
        const valRect = valu.getBoundingClientRect();
        const wide = Math.abs(
            rite ?
            valRect.right - objRect.left :
            valRect.left - objRect.right
        );
        svg.style.width  = wide + 'px';
        svg.style.height = high + 'px';
        rite ? svg.style.left = 0 : svg.style.right = 0;
        kidz = kidz.map(k => {
            if (!dist && k.tagName.match(/i-fak/i)) {
                let f = k.querySelector('b:nth-of-type(2)');
                f.innerHTML =
                f.innerHTML.replace(
                    text,
                    '<c-irk data-blank>' + text +'</c-irk>'
                );
                k.setAttribute('data-dark', '1');
                return f.children[0];
            } else { return k; }
        });
        
        rite || kidz.reverse();
        
        kidz.forEach((k, i) => {
        
            let kidRect = k.getBoundingClientRect();
        
        
            let origin = [valRect.width / 2, high];
            let target = [(kidRect.left + kidRect.width / 2 -
                valRect.left), high];
            if (rite) {
                target = [svg.getBoundingClientRect().width - valRect.width / 2, high];
                origin = [(kidRect.left + kidRect.width / 2 - objRect.left), high];
            }
            let xrad = Math.abs(origin[0] - target[0]) / 2;
            let midPt = origin[0] + xrad;
            let yrad = high - dif * i;
            d += `\
M ${ origin.join(' ') }\
A ${ xrad } ${ yrad } 0 0 1 ${ target.join(' ') }\
h ${(dist&&!rite)||(!dist&&rite)?-10:-2}\
A ${ xrad-12 } ${ yrad *((xrad-12)/xrad) } 0 0 0\
  ${ origin[0] + ((dist&&!rite)||(!dist&&rite)?2:10)}\
  ${ high }\
Z\
            `;
        
        });
        path.setAttribute('d', d);
        
    }
)})();
