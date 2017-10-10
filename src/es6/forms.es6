function toggleOnForm(elem) {
    if (!$(elem).hasClass('is-active')) {
        $(elem).addClass('is-active')
        $('.modal-card').addClass('animated flipInY')
        $('.modal-background').addClass('animated fadeIn')
        $('html').addClass('is-not-scrollable')
        setTimeout(function () {
            $('.modal-card').removeClass('animated flipInY')
            $('.modal-background').removeClass('animated fadeIn')
        }, 1000);
    }
}

function toggleOffForm(elem) {
    if ($(elem).hasClass('is-active')) {
        $('.modal-card').addClass('animated flipOutY')
        $('.modal-background').addClass('animated fadeOut')
        setTimeout(function () {
            $(elem).removeClass('is-active')
            $('.modal-card').removeClass('animated flipOutY')
            $('.modal-background').removeClass('animated fadeOut')
            $('html').removeClass('is-not-scrollable')
            $(elem).find('.field, button.is-success').removeClass('is-hidden');
            $(elem).find('.modal-card-body .send-ok').addClass('is-hidden');
        }, 1000);
    }
}

function newsletterCookie() {
    setCookie('newsletter', '1', 30);
}

function newsletterSessionCookie() {
    setCookie('newsletter', '1');
}

$(document).ready(() => {

    $('.toggle-on-form').click(function() {
        toggleOnForm('#modal-form');
    });
    $('.toggle-off-form').click(function() {
        toggleOffForm('#modal-form');
    });

    $('.toggle-on-jobform').click(function() {
        toggleOnForm('#modal-jobform');
    });
    $('.toggle-off-jobform').click(function() {
        toggleOffForm('#modal-jobform');
    });

    let newsletterTimeout = null;

    if (getCookie('newsletter') != "1") {
        newsletterTimeout = setTimeout(() => toggleOnForm('#modal-newsletterform'), 60000);
    }

    $('.toggle-on-newsletterform').click(function() {
        if (newsletterTimeout) {
            clearTimeout(newsletterTimeout);
        }
        toggleOnForm('#modal-newsletterform');
    });
    $('.toggle-off-newsletterform').click(function() {
				if (getCookie('newsletter') != "1") {
					newsletterSessionCookie()
				}
        toggleOffForm('#modal-newsletterform');
    });


    $('.inputfile').change( function(e) {
        let fileName
        let $span = $(this).parent().parent().find('span.validation')
        if (this.files && this.files.length > 1) {
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else {
            fileName = e.target.value.split('\\').pop();
        }
        if (!fileName) {
            $span.text('(Adjunta un archivo)')
            $(this).next().addClass('is-danger');
            $(this).next().removeClass('is-primary is-success');
            $(this).next().find('span').html('Adjunta tu CV');
            this.setCustomValidity('');
        } else if (this.files[0].type !== 'application/pdf') {
            $span.text('(Debe ser un archivo PDF)')
            $(this).next().addClass('is-danger');
            $(this).next().removeClass('is-primary is-success');
            $(this).next().find('span').html('Adjunta tu CV');
            this.setCustomValidity("Debe ser un archivo PDF")
        } else {
            $span.text('')
            $(this).next().find('span').html(fileName);
            $(this).next().removeClass('is-primary is-danger');
            $(this).next().addClass('is-success');
            this.setCustomValidity('');
        }

    })


        $('input[name=nombre], input[name=NAME]').change(function (e) {
        let value = $(this).val()
        let $span = $(this).parent().parent().find('span.validation')
        if (this.validity.valueMissing) {
            $span.text('(Escribe un nombre)')
            $(this).addClass('is-danger')
            this.setCustomValidity('');
        } else if (this.validity.patternMismatch) {
            $span.text('(Solo puede contener letras y espacios)')
            $(this).addClass('is-danger')
            this.setCustomValidity('Solo puede contener letras y espacios');
        } else if (this.validity.valid){
            $span.text('')
            $(this).removeClass('is-danger')
            this.setCustomValidity('');
        }
    })

    $('input[name=empresa]').change(function (e) {
        let value = $(this).val()
        let $span = $(this).parent().parent().find('span.validation')
        if (this.validity.valueMissing) {
            $span.text('(Escribe el nombre de la empresa)')
            $(this).addClass('is-danger')
        } else if (this.validity.valid){
            $span.text('')
            $(this).removeClass('is-danger')
        }
    })

    $('input[name=telefono]').change(function (e) {
        let value = $(this).val()
        let $span = $(this).parent().parent().find('span.validation')
        if (this.validity.valueMissing) {
            $span.text('(Escribe un teléfono)')
            $(this).addClass('is-danger')
        } else if (!this.validity.valid) {
            $span.text('(No es un teléfono válido)')
            $(this).addClass('is-danger')
        } else if (this.validity.valid) {
            $span.text('')
            $(this).removeClass('is-danger')
        }
    })

    $('input[name=url]').change(function (e) {
        let value = $(this).val()
        let $span = $(this).parent().parent().find('span.validation')
        if (this.validity.valueMissing) {
            $span.text('(Escribe una URL)')
            $(this).addClass('is-danger')
        } else if (!this.validity.valid) {
            $span.text('(No es una URL válida)')
            $(this).addClass('is-danger')
        } else if (this.validity.valid) {
            $span.text('')
            $(this).removeClass('is-danger')
        }
    })

        $('input[name=email], input[name=EMAIL]').change(function (e) {
        let value = $(this).val()
        let $span = $(this).parent().parent().find('span.validation')
        if (this.validity.valueMissing) {
            $span.text('(Escribe un email)')
            $(this).addClass('is-danger')
        } else if (!this.validity.valid) {
            $span.text('(No es un email válido)')
            $(this).addClass('is-danger')
        } else if (this.validity.valid) {
            $span.text('')
            $(this).removeClass('is-danger')
        }
    })

    $('textarea[name=motivos]').change(function (e) {
        let value = $(this).val()
        let $span = $(this).parent().parent().find('span.validation')
        if (this.validity.valueMissing) {
            $span.text('(Escribe tus motivos)')
            $(this).addClass('is-danger')
        } else if (this.validity.valid) {
            $span.text('')
            $(this).removeClass('is-danger')
        }
    })

});

$('.from-url').change(function () {
    $('.dest-url').val($(this).val())
})


$('form[name=auditoria]').submit(function(event) {
    event.preventDefault()

    let $form = $(this),
        url = $form.attr("action"),
        form = {
            url: $form.find("input[name='url']").val(),
            nombre: $form.find("input[name='nombre']").val(),
            empresa: $form.find("input[name='empresa']").val(),
            email: $form.find("input[name='email']").val(),
            telefono: $form.find("input[name='telefono']").val(),
            sugerencia: $form.find("textarea[name='sugerencia']").val(),
        }

    $form.find('button.is-success').addClass('is-loading')
    $form.find('button.is-success').prop('disabled', true)


    $.ajax({
        type: 'POST',
        url: url,
        data: form,

        success: function(data, textStatus, request) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-ok').removeClass('is-hidden');
            // Facebook pixel event
            fbq('track', 'CompleteRegistration', {
                value: 0,
                currency: '€'
            });
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading')
                $form.find('button.is-success').prop('disabled', false)
                toggleOffForm($('#modal-form'))
            }, 3000);


        },
        error: function (request, textStatus, errorThrown) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-fail').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading')
                $form.find('button.is-success').prop('disabled', false)
                $form.find('.field, button.is-success').removeClass('is-hidden');
                $form.find('.modal-card-body .send-fail').addClass('is-hidden');
            }, 3000);
        }
    })

})

$('form[name=trabaja]').submit(function (event) {
    event.preventDefault()

    let $form = $(this);
    let url = $form.attr("action");
    let form = new FormData();
    form.append('nombre', $form.find("input[name='nombre']").val());
    form.append('email', $form.find("input[name='email']").val());
    form.append('telefono', $form.find("input[name='telefono']").val());
    form.append('motivos', $form.find("textarea[name='motivos']").val());
    form.append('file', $form.find("input[name='file']")[0].files[0]);

    $form.find('button.is-success').addClass('is-loading')
    $form.find('button.is-success').prop('disabled', true)

    $.ajax({
        type: 'POST',
        url: url,
        data: form,
        cache: false,
        contentType: false,
        processData: false,

        success: function (data, textStatus, request) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-ok').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading')
                $form.find('button.is-success').prop('disabled', false)
                toggleOffForm($('#modal-jobform'))
            }, 3000);


        },
        error: function (request, textStatus, errorThrown) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-fail').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading')
                $form.find('button.is-success').prop('disabled', false)
                $form.find('.field, button.is-success').removeClass('is-hidden');
                $form.find('.modal-card-body .send-fail').addClass('is-hidden');
            }, 3000);
        }
    })
})

$('form[name=llamamos]').submit(function (event) {
    event.preventDefault()

    let $form = $(this);
    let url = $form.attr("action");
    let breadcrumbs = $('.menu-list').find('.is-active').map((i, elem) => elem.text)
    let form = new FormData();
    form.append('nombre', $form.find("input[name='nombre']").val());
    form.append('email', $form.find("input[name='email']").val());
    form.append('telefono', $form.find("input[name='telefono']").val());
    form.append('categoria', breadcrumbs[0]);
    form.append('servicio', breadcrumbs[1]);

    $form.find('button.is-success').addClass('is-loading')
    $form.find('button.is-success').prop('disabled', true)

    $.ajax({
        type: 'POST',
        url: url,
        data: form,
        cache: false,
        contentType: false,
        processData: false,

        success: function (data, textStatus, request) {
            $form.parent().children(':not(.hero.send-ok)').addClass('is-hidden');
            $form.parent().children('.hero.send-ok').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading')
                $form.find('button.is-success').prop('disabled', false)
                $form.parent().children(':not(.hero)').removeClass('is-hidden');
                $form.parent().children('.hero').addClass('is-hidden');
            }, 3000);


        },
        error: function (request, textStatus, errorThrown) {
            $form.parent().children(':not(.hero.send-fail)').addClass('is-hidden');
            $form.parent().children('.hero.send-fail').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading')
                $form.find('button.is-success').prop('disabled', false)
                $form.parent().children(':not(.hero)').removeClass('is-hidden');
                $form.parent().children('.hero').addClass('is-hidden');
            }, 3000);
        }
    })
})


$('form[name=newsletter]').submit(function (event) {
    event.preventDefault()

    let $form = $(this);
    let url = $form.attr("action");

    $form.find('button.is-success').addClass('is-loading')
    $form.find('button.is-success').prop('disabled', true)

    $.ajax({
        type: 'POST',
        url: url,
        data: $form.serialize(),
        dataType: 'jsonp',

        success: function (data, textStatus, request) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-ok').removeClass('is-hidden');
            newsletterCookie()
            // Facebook pixel event
            // fbq('track', 'CompleteRegistration', {
            // 	value: 0,
            // 	currency: '€'
            // });
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading')
                $form.find('button.is-success').prop('disabled', false)
                toggleOffForm($('#modal-newsletterform'))
            }, 3000);


        },
        error: function (request, textStatus, errorThrown) {
            $form.find('.field, button.is-success').addClass('is-hidden');
            $form.find('.modal-card-body .send-fail').removeClass('is-hidden');
            // ga.send
            setTimeout(function () {
                $form.find('button.is-success').removeClass('is-loading')
                $form.find('button.is-success').prop('disabled', false)
                $form.find('.field, button.is-success').removeClass('is-hidden');
                $form.find('.modal-card-body .send-fail').addClass('is-hidden');
            }, 3000);
        }
    })

})
