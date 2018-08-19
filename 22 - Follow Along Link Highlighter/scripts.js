// Grab all links for now. Later make them only menu links
  const  triggers = document.querySelectorAll('ul.menu a');

  const highlight = document.createElement('span')
  highlight.classList.add('lightBubble')
  document.body.append(highlight)
    
  function highlightLink() {
      //console.info(this)
      const linkCoords = this.getBoundingClientRect();
      //console.log(linkCoords)

  const coords = {
    w: linkCoords.width,
    h: linkCoords.height,
    top: linkCoords.top + window.scrollY, // window.scroll is offset from initial load position
    left:linkCoords.left+ window.scrollX
    }
    highlight.style.width = `${coords.w}px`
    highlight.style.height= `${coords.h}px`

  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px )`
  }

// call highlightLink() when mouseenter for each menu link  
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
