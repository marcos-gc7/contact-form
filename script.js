let fname = document.getElementById('fname')
let lname = document.getElementById('lname')
let email = document.getElementById('email')
let queryType = document.getElementsByName('type')
let message = document.getElementById('message')
let terms = document.getElementById('terms')
let sucessState = document.getElementById('sucess')


function verifyText(f, l, m) {
  return f.length > 0 && l.length > 0 && m.length > 0
}

function verifyQueryType(v) {
  return v[0].checked || v[1].checked
  
}

function verifyEmail(e) {
  e = e.trim() // remove espaços em branco antes/depois
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (e.length > 0 && regex.test(e)) {
    return true
  } else {
    return false
  }

  // ^ início da string
  // [^\s@]+ um ou mais caracteres que não são espaço nem "@"
  // @ tem que ter um "@"
  // [^\s@]+ de novo, texto depois do "@"
  // \. precisa ter um ponto
  // [^\s@]+ texto depois do ponto
  // $ fim da string
  
}

function handleSubmit (event) {
  event.preventDefault()

  sucessState.innerHTML = ""
  sucessState.removeAttribute("class")

  if(verifyText(fname.value, lname.value, message.value) && verifyEmail(email.value) && verifyQueryType(queryType) && terms.checked) {
    
    sucessState.classList.add('flex', 'flex', 'flex-col', 'justify-between', 'gap-2', 'p-4', 'desktop:p-6', 'w-[290px]', 'desktop:w-[450px]', 'desktop:h-[110px]', 'rounded-xl', 'bg-[#2A4244]', 'text-white', 'fixed', 'top-5')

    let container = document.createElement('div')
    container.setAttribute('class', 'flex flex-row gap-2')

    let img = document.createElement('img')
    img.setAttribute('src', 'assets/images/icon-success-check.svg')

    let h2 = document.createElement('h2')
    h2.setAttribute('class', 'font-semibold')
    h2.innerHTML = 'Message Sent!'

    let p = document.createElement('p')
    p.setAttribute('class', 'font-light text-[15px] text-justify')
    p.innerHTML = "Thanks for completing the form. We'll be in touch soon!"

    sucessState.appendChild(container)
    container.appendChild(img)
    container.appendChild(h2)
    sucessState.appendChild(p)

      

    setTimeout(() => { 
      sucessState.innerHTML = ""      
      sucessState.removeAttribute("class") // remove as classes pra ele sumir da tela
    }, 2500)

    let form = document.getElementById('form').reset()  // Limpa o formulário todo.

     /* <div class="flex flex-col justify-between gap-2 p-4 desktop:p-6 w-[290px] desktop:w-[450px] desktop:h-[110px] rounded-xl bg-[#2A4244] text-white fixed top-5">
          <div class="flex flex-row gap-2">
            <img src="assets/images/icon-success-check.svg">
            <h2 class="font-semibold">Message Sent!</h2>
          </div>
          <p class="font-light text-[15px] text-justify">Thanks for completing the form. We'll be in touch soon!</p>
      </div> */
    
  } else {
    window.alert('Algo deu errado!')
  }
  
}