var $ = jQuery.noConflict()
  , simuladorFixed = {
    init: function(a) {
        simuladorFixed.config = {},
        simuladorFixed.el = {
            "this": $("#simulacao"),
            form: $("#simulador-fixed", "#simulacao"),
            botcheck: $("#botcheck", "#simulador-fixed"),
            estados: $("#estados", "#simulador-fixed"),
            cidades: $("#cidades", " #simulador-fixed"),
            quantoPaga: $("#quantoPaga", " #simulador-fixed"),
            nome: $("#nome", "#simulador-fixed"),
            email: $("#email", "#simulador-fixed")
        },
        $.extend(simuladorFixed.config, a),
        simuladorFixed.setup()
    },
    setup: function() {
        var a = modalSimulador.findStoredSimulado();
        simuladorFixed.el.form.submit(simuladorFixed.formSubmit),
        simuladorFixed.el.estados.change(function() {
            getCidades(simuladorFixed.el.estados.find("option:selected").attr("id"), simuladorFixed.el.cidades)
        }),
        getEstados(simuladorFixed.el.estados, simuladorFixed.el.cidades),
        simuladorFixed.el.quantoPaga.mask("000.000.000,00", {
            reverse: !0
        }),
        a.stored && (simuladorFixed.el.nome.val(a.dados.nome),
        simuladorFixed.el.email.val(a.dados.email),
        simuladorFixed.el.quantoPaga.val(a.dados.quantoPaga))
    },
    formSubmit: function(a) {
        if (a.preventDefault(),
        $(this).isValid()) {
            showLoader();
            var e = {
                salvo: !0,
                nome: simuladorFixed.el.nome.val(),
                email: simuladorFixed.el.email.val(),
                estado: simuladorFixed.el.estados.find("option:selected").attr("id"),
                cidade: simuladorFixed.el.cidades.find("option:selected").attr("id"),
                quantoPaga: simuladorFixed.el.quantoPaga.val().replace(".", "")
            };
            modalSimulador.salvarForm(e);
            var o = {
                action: "simular",
                security: bs.nonce,
                botcheck: simuladorFixed.el.botcheck.val(),
                quantoPaga: e.quantoPaga
            };
            $.ajax({
                url: bs.ajax_url,
                type: "POST",
                dataType: "json",
                data: o,
                error: function(a) {
                    removeLoader(),
                    createModal("error", "Erro ao enviar o formulário", "<p>Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.</p>"),
                    console.error(a)
                },
                success: function(a) {
                    modalSimulador.salvarSimulado(o.quantoPaga, a),
                    criarLead(simuladorFixed.el.email.val(), "si"),
                    window.location.href = paths.siteUrl + "/minha-simulacao"
                }
            })
        }
    }
}
  , vantagensContent = {
    init: function() {
        vantagensContent.config = {
            templateUrl: paths.templatesPath
        },
        vantagensContent.el = {
            modal: $("#modal"),
            "this": $("#vantagensContent"),
            modalOpens: $("a", "#vantagensContent"),
            economia: $("#economia", "#vantagensContent"),
            imune: $("#imune", "#vantagensContent"),
            retorno: $("#retorno", "#vantagensContent"),
            valorizacao: $("#valorizacao", "#vantagensContent"),
            vidaUtil: $("#vidaUtil", "#vantagensContent"),
            parcele: $("#parcele", "#vantagensContent")
        },
        vantagensContent.setup()
    },
    setup: function() {
        vantagensContent.el.modalOpens.click(function(a) {
            a.preventDefault();
            var e = a.target.getAttribute("modal")
              , o = a.target.getAttribute("src");
            void 0 != e && vantagensContent.openModal(e, o)
        })
    },
    openModal: function(a, e) {
        vantagensContent.el.modal.modal().load(paths.templatesPath + "modal-" + a + ".html", function() {
            $(this).css({
                "background-color": "rgba(0, 0, 0, 0.5)"
            }).find("img").attr("src", e)
        })
    }
}
  , animacacao = {
    init: function() {
        animacacao.el = {
            iframe: $("iframe", "#como-funciona")[0],
            player: $f($("iframe", "#como-funciona")[0]),
            play: $("#play", "#como-funciona")
        },
        animacacao.setup()
    },
    setup: function() {
        animacacao.el.play.click(animacacao.play)
    },
    play: function() {
        animacacao.el.player.api($(this).text().toLowerCase())
    }
};
$(window).load(function() {
    simuladorFixed.init(),
    vantagensContent.init(),
    animacacao.init()
}).scroll(function() {
    var a = !1
      , e = $(".graphic")
      , o = e.offset().top - $(window).scrollTop();
    o < 600 && o > 0 && !a && (a = !a,
    $(".animate-f").each(function(a) {
        $(this).delay(200 * a).queue(function() {
            $(this).addClass("animated-f").clearQueue()
        })
    }))
});
