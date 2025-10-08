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
  e = e.trim()
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return e.length > 0 && regex.test(e)
}


function handleSubmit(event) {
  event.preventDefault()

  document.querySelectorAll('#form span').forEach(span => span.remove())

  document.querySelectorAll('#fname, #lname, #email, #message').forEach(el => {
    el.classList.remove('border-[#D73C3C]')
    el.classList.add('border-[#87A3A6]', 'mb-5')
  })

  sucessState.innerHTML = ""
  sucessState.removeAttribute("class")

  if (
    verifyText(fname.value, lname.value, message.value) &&
    verifyEmail(email.value) &&
    verifyQueryType(queryType) &&
    terms.checked
  ) {
    sucessState.classList.add(
      'flex', 'flex', 'flex-col', 'justify-between', 'gap-2', 'p-4',
      'desktop:p-6', 'w-[290px]', 'desktop:w-[450px]', 'desktop:h-[110px]',
      'rounded-xl', 'bg-[#2A4244]', 'text-white', 'fixed', 'top-5'
    )

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
      sucessState.removeAttribute("class")
    }, 2500)

    document.getElementById('form').reset()
  } else {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    function showError(field, containerId, message) {
      let container = document.getElementById(containerId)
      field.classList.remove('mb-5', 'border-[#87A3A6]')
      field.classList.add('border-[#D73C3C]')
      let span = document.createElement('span')
      span.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
      span.innerHTML = message
      container.appendChild(span)
    }

    if (fname.value.length == 0) showError(fname, 'fname-required', 'This field is required')
    if (lname.value.length == 0) showError(lname, 'lname-required', 'This field is required')

    if (email.value.length == 0)
      showError(email, 'email-required', 'This field is required')
    else if (!regex.test(email.value))
      showError(email, 'email-required', 'Please enter a valid email address')

    if (message.value.length == 0)
      showError(message, 'message-required', 'This field is required')

    if (!queryType[0].checked && !queryType[1].checked) {
      let queryType_required = document.getElementById('type-required')
      let span = document.createElement('span')
      span.setAttribute('class', 'block mt-2 text-[#D73C3C] text-sm')
      span.innerHTML = 'Please select a query type'
      queryType_required.appendChild(span)
    }

    if (!terms.checked) {
      let terms_required = document.getElementById('terms-required')
      let span = document.createElement('span')
      span.setAttribute('class', 'block mt-2 text-[#D73C3C] text-sm')
      span.innerHTML = 'To submit this form, please consent to being contacted'
      terms_required.appendChild(span)
    }
  }
}

// ----------------------------
// Reatividade dos campos
// ----------------------------
function enableRealtimeValidation() {

  function handleTextField(field, containerId, message = 'This field is required') {
    const container = document.getElementById(containerId)

    field.addEventListener('input', () => {
      const span = container.querySelector('span')

      if (field.value.trim().length > 0) {
        // ✅ Remove erro ao digitar
        field.classList.remove('border-[#D73C3C]')
        if (!field.classList.contains('mb-5')) field.classList.add('mb-5')
        field.classList.add('border-[#87A3A6]')
        if (span) span.remove()
      } else {
        // ⚠️ Volta o erro se apagar tudo (garantindo que o input perca o mb-5)
        field.classList.remove('mb-5', 'border-[#87A3A6]')
        field.classList.add('border-[#D73C3C]')
        if (!span) {
          const newSpan = document.createElement('span')
          newSpan.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
          newSpan.innerHTML = message
          container.appendChild(newSpan)
        }
      }
    })
  }

  // Campos de texto
  handleTextField(fname, 'fname-required')
  handleTextField(lname, 'lname-required')
  handleTextField(message, 'message-required')

  // E-mail
  const emailContainer = document.getElementById('email-required')
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  email.addEventListener('input', () => {
    const span = emailContainer.querySelector('span')
    const value = email.value.trim()

    if (value.length === 0) {
      email.classList.remove('mb-5', 'border-[#87A3A6]')
      email.classList.add('border-[#D73C3C]')
      if (!span) {
        const newSpan = document.createElement('span')
        newSpan.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        newSpan.innerHTML = 'This field is required'
        emailContainer.appendChild(newSpan)
      } else span.innerHTML = 'This field is required'
    } else if (!regex.test(value)) {
      email.classList.remove('mb-5', 'border-[#87A3A6]')
      email.classList.add('border-[#D73C3C]')
      if (!span) {
        const newSpan = document.createElement('span')
        newSpan.setAttribute('class', 'pt-2 text-[#D73C3C] text-sm mb-5')
        newSpan.innerHTML = 'Please enter a valid email address'
        emailContainer.appendChild(newSpan)
      } else span.innerHTML = 'Please enter a valid email address'
    } else {
      email.classList.remove('border-[#D73C3C]')
      email.classList.add('border-[#87A3A6]', 'mb-5')
      if (span) span.remove()
    }
  })

  // Checkbox
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

  // Radios
  const queryTypeContainer = document.getElementById('type-required')
  const radios = document.getElementsByName('type')
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const span = queryTypeContainer.querySelector('span')
      const anyChecked = Array.from(radios).some(r => r.checked)
      if (anyChecked) {
        if (span) span.remove()
      } else if (!span) {
        const newSpan = document.createElement('span')
        newSpan.setAttribute('class', 'block mt-2 text-[#D73C3C] text-sm')
        newSpan.innerHTML = 'Please select a query type'
        queryTypeContainer.appendChild(newSpan)
      }
    })
  })
}

enableRealtimeValidation()