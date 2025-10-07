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

  document.querySelectorAll('#form span').forEach(span => span.remove()) // Remove as mensagens de erro.

  document.querySelectorAll('#fname, #lname, #email, #message').forEach(el => { // Remove o estilo da mensagem de erro a adiciona o estilo padrão.
  el.classList.remove('border-[#D73C3C]')    
  el.classList.add('border-[#87A3A6]', 'mb-5') 
})

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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (fname.value.length == 0) {
        let fname_required = document.getElementById('fname-required')
        fname.classList.remove('mb-5', 'border-[#87A3A6]')
        fname.classList.add('border-[#D73C3C]')
        let span = document.createElement('span')
        span.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        span.innerHTML = 'This field is required'

        fname_required.appendChild(span)
      }

      if (lname.value.length == 0) {
        let lname_required = document.getElementById('lname-required')
        lname.classList.remove('mb-5', 'border-[#87A3A6]')
        lname.classList.add('border-[#D73C3C]')
        let span = document.createElement('span')
        span.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        span.innerHTML = 'This field is required'

        lname_required.appendChild(span)
      }

      if (email.value.length == 0) {
        let email_required = document.getElementById('email-required')
        email.classList.remove('mb-5', 'border-[#87A3A6]')
        email.classList.add('border-[#D73C3C]')
        let span = document.createElement('span')
        span.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        span.innerHTML = 'This field is required'

        email_required.appendChild(span)
      } else if (!regex.test(email.value)) {
        let email_required = document.getElementById('email-required')
        email.classList.remove('mb-5', 'border-[#87A3A6]')
        email.classList.add('border-[#D73C3C]')
        let span = document.createElement('span')
        span.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        span.innerHTML = 'Please enter a valid email address'

        email_required.appendChild(span)
      }

      if (message.value.length == 0) {
        let message_required = document.getElementById('message-required')
        message.classList.remove('mb-5', 'border-[#87A3A6]')
        message.classList.add('border-[#D73C3C]')
        let span = document.createElement('span')
        span.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        span.innerHTML = 'This field is required'

        message_required.appendChild(span)
      }

      if (!queryType[0].checked && !queryType[1].checked) {
        let queryType_required = document.getElementById('type-required')
        let span = document.createElement('span')
        span.setAttribute('class', 'block mt-2 text-[#D73C3C] text-sm')
        span.innerHTML = 'Please select a query type'

        queryType_required.appendChild(span)
      }

      if(!terms.checked) {
        let terms_required = document.getElementById('terms-required')
        let span = document.createElement('span')
        span.setAttribute('class', 'block mt-2 text-[#D73C3C] text-sm')
        span.innerHTML = 'To submit this form, please consent to being contacted'

        terms_required.appendChild(span)
      }
  
  }
  
}

// ----------------------------
// Reatividade dos campos (inputs, textarea, checkbox, radio)
// ----------------------------
function enableRealtimeValidation() {

  // Essa função serve é para remover o estilo de erro do fname, lname e message, quando eles forem corrigidos e adicionarem o estilo padrão novamente, mas caso eu apague o que foi escrito nesses inputs a mensagem de erro retorna.
  function handleTextField(field, containerId, message = 'This field is required') {
    const container = document.getElementById(containerId)

    field.addEventListener('input', () => {
      const span = container.querySelector('span')

      if (field.value.trim().length > 0) {
        // Remove erro ao digitar
        field.classList.remove('border-[#D73C3C]')
        field.classList.add('border-[#87A3A6]') // Removi o 'mb-5'
        if (span) span.remove()
      } else {
        // Volta o erro se apagar tudo
        if (!span) {
          field.classList.remove('border-[#87A3A6]')
          field.classList.add('border-[#D73C3C]')
          const newSpan = document.createElement('span')
          newSpan.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
          newSpan.innerHTML = message
          container.appendChild(newSpan)
        }
      }
    })
  }

  // 🔹 Campos de texto e textarea
  handleTextField(fname, 'fname-required')
  handleTextField(lname, 'lname-required')
  handleTextField(message, 'message-required')

  // 🔹 Campo de e-mail com regex
  const emailContainer = document.getElementById('email-required')
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  email.addEventListener('input', () => {
    const span = emailContainer.querySelector('span')
    const value = email.value.trim()

    if (value.length === 0) {
      email.classList.remove('border-[#87A3A6]')
      email.classList.add('border-[#D73C3C]')
      if (!span) {
        const newSpan = document.createElement('span')
        newSpan.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        newSpan.innerHTML = 'This field is required'
        emailContainer.appendChild(newSpan)
      } else {
        span.innerHTML = 'This field is required'
      }
    } else if (!regex.test(value)) {
      email.classList.add('border-[#D73C3C]')
      if (!span) {
        const newSpan = document.createElement('span')
        newSpan.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        newSpan.innerHTML = 'Please enter a valid email address'
        emailContainer.appendChild(newSpan)
      } else {
        span.innerHTML = 'Please enter a valid email address'
      }
    } else {
      email.classList.remove('border-[#D73C3C]')
      email.classList.add('border-[#87A3A6]', 'mb-5')
      if (span) span.remove()
    }
  })

  // 🔹 Checkbox (Terms)
  const termsContainer = document.getElementById('terms-required')
  terms.addEventListener('change', () => {
    const span = termsContainer.querySelector('span')
    if (terms.checked) {
      if (span) span.remove()
    } else {
      if (!span) {
        const newSpan = document.createElement('span')
        newSpan.setAttribute('class', 'block mt-2 text-[#D73C3C] text-sm')
        newSpan.innerHTML = 'To submit this form, please consent to being contacted'
        termsContainer.appendChild(newSpan)
      }
    }
  })

  // 🔹 Radios (Query Type)
  const queryTypeContainer = document.getElementById('type-required')
  const radios = document.getElementsByName('type')

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const span = queryTypeContainer.querySelector('span')
      const anyChecked = Array.from(radios).some(r => r.checked)

      if (anyChecked) {
        // Remove erro quando algum for selecionado
        if (span) span.remove()
      } else {
        // Volta o erro se todos forem desmarcados (caso raro)
        if (!span) {
          const newSpan = document.createElement('span')
          newSpan.setAttribute('class', 'block mt-2 text-[#D73C3C] text-sm')
          newSpan.innerHTML = 'Please select a query type'
          queryTypeContainer.appendChild(newSpan)
        }
      }
    })
  })
}

// Ativa o comportamento dinâmico
enableRealtimeValidation()
