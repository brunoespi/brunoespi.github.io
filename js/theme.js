(function($) {
    "use strict";

    $(window).on('load', function() {
        $('.lds-ellipsis').fadeOut(); // will first fade out the loading animation
        $('.preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(333);
    });

    $(window).on('scroll', function() {
        var stickytop = $('#header.sticky-top .bg-transparent');
        var stickytopslide = $('#header.sticky-top-slide');

        if ($(this).scrollTop() > 1) {
            stickytop.addClass("sticky-on-top");
            stickytop.find(".logo img").attr('src', stickytop.find('.logo img').data('sticky-logo'));
        } else {
            stickytop.removeClass("sticky-on-top");
            stickytop.find(".logo img").attr('src', stickytop.find('.logo img').data('default-logo'));
        }

        if ($(this).scrollTop() > 180) {
            stickytopslide.find(".primary-menu").addClass("sticky-on");
            stickytopslide.find(".logo img").attr('src', stickytopslide.find('.logo img').data('sticky-logo'));
        } else {
            stickytopslide.find(".primary-menu").removeClass("sticky-on");
            stickytopslide.find(".logo img").attr('src', stickytopslide.find('.logo img').data('default-logo'));
        }
    });

    if ($("body").hasClass("side-header")) {
        $('.smooth-scroll').on('click', function() {
            event.preventDefault();
            var sectionTo = $(this).attr('href');
            $('html, body').stop().animate({
                scrollTop: $(sectionTo).offset().top
            }, 1500, 'easeInOutExpo');
        });
    } else {
        $('.smooth-scroll').on('click', function() {
            event.preventDefault();
            var sectionTo = $(this).attr('href');
            $('html, body').stop().animate({
                scrollTop: $(sectionTo).offset().top - 50
            }, 1500, 'easeInOutExpo');
        });
    }

    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('show');
    });
    $(".navbar-nav a").on('click', function() {
        $(".navbar-collapse, .navbar-toggler").removeClass("show");
    });

    $('.navbar-side-open .collapse, .navbar-overlay .collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
            e.preventDefault();
        }),
        $('.navbar-side-open [data-bs-toggle="collapse"], .navbar-overlay [data-bs-toggle="collapse"]').on('click', function(e) {
            e.preventDefault();
            $($(this).data('bs-target')).toggleClass('show');
        })

    $(".owl-carousel").each(function(index) {
        var a = $(this);
        if ($("html").attr("dir") == 'rtl') {
            var rtlVal = true
        } else {
            var rtlVal = false
        }
        $(this).owlCarousel({
            rtl: rtlVal,
            autoplay: a.data('autoplay'),
            center: a.data('center'),
            autoplayTimeout: a.data('autoplaytimeout'),
            autoplayHoverPause: a.data('autoplayhoverpause'),
            loop: a.data('loop'),
            speed: a.data('speed'),
            nav: a.data('nav'),
            dots: a.data('dots'),
            autoHeight: a.data('autoheight'),
            autoWidth: a.data('autowidth'),
            margin: a.data('margin'),
            stagePadding: a.data('stagepadding'),
            slideBy: a.data('slideby'),
            lazyLoad: a.data('lazyload'),
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            animateOut: a.data('animateout'),
            animateIn: a.data('animatein'),
            video: a.data('video'),
            items: a.data('items'),
            responsive: {
                0: {
                    items: a.data('items-xs'),
                },
                576: {
                    items: a.data('items-sm'),
                },
                768: {
                    items: a.data('items-md'),
                },
                992: {
                    items: a.data('items-lg'),
                }
            }
        });
    });

    $(".parallax").each(function() {
        $(this).parallaxie({
            speed: 0.5,
        });
    });

    $(".counter").each(function() {
        $(this).appear(function() {
            $(this).countTo({
                speed: 1800,
            });
        });
    });

    $(".typed").each(function() {
        var typed = new Typed('.typed', {
            stringsElement: '.typed-strings',
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 1500,
        });
    });

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    $(function() {
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 400) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        $('#back-to-top').on("click", function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'slow');
            return false;
        });
    });

    $(".counter").each(function () {
        $(this).appear(function () {
            $(this).countTo({
                speed: 1800,
            });
        });
    });

    var form = document.getElementById("contact-form");
        
    async function handleSubmit(event) {
        event.preventDefault();
        var ok_status = document.getElementById("contact-form-ok");
        var ko_status = document.getElementById("contact-form-ko");
        var submit = document.getElementById('submit-btn');

        submit.setAttribute('disabled', '');
        submit.innerHTML = '<span role="status" aria-hidden="true" class="spinner-border spinner-border-sm align-self-center me-2"></span>Enviando&hellip;';
        
        ok_status.classList.add('d-none');
        ko_status.classList.add('d-none');
        var data = new FormData(event.target);

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                ok_status.querySelector('div').innerHTML = "Gracias por tu mensaje!";
                ok_status.classList.remove('d-none');
                ko_status.classList.add('d-none');

                submit.removeAttribute('disabled');
                submit.innerHTML = 'Enviar <span class="ms-3"><i class="fas fa-arrow-right"></i></span>';

                form.reset()
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        ko_status.querySelector('div').innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                        ko_status.querySelector('div').innerHTML = "Oops! Se ha producido un problema al enviar tu mensaje"
                    }
                    ok_status.classList.add('d-none');
                    ko_status.classList.remove('d-none');

                    submit.removeAttribute('disabled');
                    submit.innerHTML = 'Enviar <span class="ms-3"><i class="fas fa-arrow-right"></i></span>';
                })
            }
        }).catch(error => {
            ko_status.querySelector('div').innerHTML = "Oops! Se ha producido un problema al enviar tu mensaje"
            ko_status.classList.remove('d-none');

            submit.removeAttribute('disabled');
            submit.innerHTML = 'Enviar <span class="ms-3"><i class="fas fa-arrow-right"></i></span>';
        });
    }

    form.addEventListener("submit", handleSubmit);

    $('.navbar-toggler').on('click', function() {
        $('#header-subnav').toggleClass('show');
    });
    $(".navbar-nav a").on('click', function() {
        $(".navbar-collapse, .navbar-toggler").removeClass("show");
    });

    $('.navbar-toggler').on('click', function () {
        $('#header-nav2').toggleClass('show');
        if ($('#header-nav2').hasClass('show')) {
            $('.navbar-toggler1').removeClass('show').hide();
            $('.navbar-toggler2').addClass('show').show();
        } else {
            $('.navbar-toggler1').removeClass('show').show();
            $('.navbar-toggler2').removeClass('show').hide();
        }
        $('#header-nav2 .navbar-collapse').css('opacity', '1 !important');
        $('#header-nav2 .navbar-collapse').css('visibility', 'visible');
        $('#header-nav2 .navbar-collapse').css('background', 'rgba(0, 0, 0, 0.95');
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse, .navbar-toggler").removeClass("show");
    });

    document.querySelector('a[data-replace="phone-link"]').href = 'tel:+34' + parseInt("27AC5920",16);
})(jQuery)