$(document).ready(function () {
    check_adv();
    var advcheck = setInterval(check_adv, 10000);
    $.fn.datepicker.defaults.language = "es";
    $.extend(true, $.fn.dataTable.defaults, { language: { url: "js/bower_components/datatables.net/i18n/Spanish.json" } });
    $.extend(jQuery.fn.dataTableExt.oSort, {
        "date-uk-pre": function (a) {
            var ukDatea = a.split("/");
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },
        "date-uk-asc": function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
        },
        "date-uk-desc": function (a, b) {
            return a < b ? 1 : a > b ? -1 : 0;
        },
    });
    var intTA = setInterval(gen_ta, 15000);
});
function loading(msg) {
    $("body").loadingModal({ position: "auto", text: msg, color: "#fff", opacity: "0.7", backgroundColor: "rgb(0,0,0)", animation: "doubleBounce" });
    $("body").loadingModal("show");
}
function loadingClose() {
    $("body").loadingModal("hide");
}
function loader(target) {
    $(target).html('<span class="blink text-green"><i class="fa fa-clock-o"></i> Procesando. Aguarde un momento...</span>');
}
function spinner(target) {
    $(target).html('<div class="spinner-border text-secondary" role="status"><span class="sr-only">Cargando...</span></div>');
}
function registro_ok() {
    Swal.fire("Registro procesado", "", "success");
}
function celda_editable_selectElement(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return "" + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
}
function close_control_sidebar() {
    $(".control-sidebar").removeClass("control-sidebar-open");
}
function check_adv() {
    $.get("apps/sistema/adv/adv.php", {}, function (j) {
        if (j.adv > 0) {
            $("#adv-label").removeClass("label-default label-success").addClass("label-danger").html(j.advcount);
            $("#adv-msg").html('<p class="text-red">' + j.advcount + " notificacion(es)</p>");
            if (j.asicheck == 1) {
                $("#adv-asicheck").show();
            } else {
                $("#adv-asicheck").hide();
            }
        } else {
            $("#adv-label").removeClass("label-danger").addClass("label-success").html(0);
            $("#adv-msg").html('<p class="text-green">Sin notificaciones</p>');
            $("#adv-asicheck").hide();
        }
    });
}
function gen_ta() {
    $.ajax({
        type: "get",
        url: "http://192.168.210.25/",
        dataType: "jsonp",
        jsonpCallback: "arduinoEthernetComCallback",
        success: function (j) {
            var temp = parseFloat(j.T);
            var hume = parseFloat(j.H);
            var ith = temp + hume;
            $("#temp").html($.number(temp, 1, ",", "."));
            if (temp >= 29) {
                $("#temp").addClass("blink text-red");
            } else {
                $("#temp").removeClass("blink text-red");
            }
            $("#humedad").html($.number(hume, 1, ",", "."));
            if (hume >= 80) {
                $("#humedad").addClass("blink text-red");
            } else {
                $("#humedad").removeClass("blink text-red");
            }
            $("#ith").html($.number(ith, 0, ",", "."));
            if (ith >= 105) {
                $("#ith").addClass("blink text-red");
            } else {
                $("#ith").removeClass("blink text-red");
            }
        },
        error: function () {
            $("#temp").html("error").addClass("blink text-red");
            $("#hume").html("error").addClass("blink text-red");
            $("#ith").html("error").addClass("blink text-red");
        },
    });
}
function mes_str(n) {
    switch (n) {
        case 1:
            return "enero";
            break;
        case 2:
            return "febrero";
            break;
        case 3:
            return "marzo";
            break;
        case 4:
            return "abril";
            break;
        case 5:
            return "mayo";
            break;
        case 6:
            return "junio";
            break;
        case 7:
            return "julio";
            break;
        case 8:
            return "agosto";
            break;
        case 9:
            return "septiembre";
            break;
        case 10:
            return "octubre";
            break;
        case 11:
            return "noviembre";
            break;
        case 12:
            return "diciembre";
            break;
    }
}
function dos_dig(valor) {
    var c = valor.length;
    if (c == 2) {
        return valor;
    } else if (c == 1) {
        return "0" + valor;
    } else {
        return valor;
    }
}
(function () {
    function decimalAdjust(type, value, exp) {
        if (typeof exp === "undefined" || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
            return NaN;
        }
        value = value.toString().split("e");
        value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
        value = value.toString().split("e");
        return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
    }
    if (!Math.round10) {
        Math.round10 = function (value, exp) {
            return decimalAdjust("round", value, exp);
        };
    }
    if (!Math.floor10) {
        Math.floor10 = function (value, exp) {
            return decimalAdjust("floor", value, exp);
        };
    }
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust("ceil", value, exp);
        };
    }
})();
function ppr_dd(f) {
    loading("");
    $.post("apps/ppr/dd/dd.php", { f: f }, function (res) {
        $("#contenido").html(res);
        $("#fecha")
            .datepicker({ language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                ppr_dd($(this).val());
            });
        $("#cdd").boxWidget("collapse");
        $("#cdd-btn").on("click", function () {
            ppr_c_dd();
        });
        $("#cdd").on("collapsed.boxwidget", function () {
            $("#cdd-content").html("");
        });
        ppr_dd_pry(f);
        loadingClose();
    });
}
function ppr_dd_pry(f) {
    $.get("apps/ppr/dd/dd.pry.php", { fecha: f }, function (res) {
        $("#pry-datos").html(res);
    });
}
function ppr_dd_haikei_detalle() {
    var fecha = $("#fecha").val();
    $("#big-popup").modal("show");
    $("#big-popup-content").html("");
    $.get("apps/ppr/dd/c.dd.haikei.detalle.php", { fecha: fecha }, function (res) {
        $("#big-popup-content").html(res);
    });
}
function ppr_dd_mec_form(avi) {
    var f = $("#fecha").val();
    loading();
    $.post("apps/ppr/dd/dd.mec.form.php", { avi: avi, f: f }, function (res) {
        $("#contenido").html(res);
        $("#avi").on("change", function () {
            ppr_dd_mec_form($(this).val());
        });
        $("#fecha")
            .datepicker({ language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                var a = $("#avi").val();
                ppr_dd_mec_form(a);
            });
        ppr_dd_mec_onSelect();
        loadingClose();
    });
}
function ppr_dd_mec_onSelect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            celda_editable_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var fecha = $("#fecha").val();
                var avi = $("#avi").val();
                var lote = $("#lote").val();
                var campo = this.getAttribute("campo");
                if (campo == "mor") {
                    var fila = this.getAttribute("fila");
                    ppr_dd_mec_regmor(fecha, avi, lote, fila, valor);
                } else if (campo == "dl_muertos_normal" || campo == "dl_muertos_prolapso" || campo == "dl_muertos_livianos") {
                    ppr_dd_mec_morclas(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_balkg1" || campo == "dl_balkg2") {
                    ppr_dd_mec_balkg(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_huevos") {
                    ppr_dd_mec_huevos(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_caudal") {
                    ppr_dd_mec_caudal(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_caudal2") {
                    ppr_dd_mec_caudal2(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_tempm1" || campo == "dl_tempm2") {
                    ppr_dd_mec_temp(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_transferin") {
                    ppr_dd_mec_transferin(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_transferout") {
                    ppr_dd_mec_transferout(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_venta") {
                    ppr_dd_mec_venta(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_ajuste") {
                    ppr_dd_mec_ajuste(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_anota") {
                    ppr_dd_mec_anota(fecha, avi, lote, campo, valor);
                } else if (campo == "dl_calcico") {
                    ppr_dd_mec_calcico(fecha, avi, lote, campo, valor);
                }
            }
        };
    }
}
function ppr_dd_mec_regmor(fecha, avi, lote, fila, valor) {
    var mf = $("#total-morfilas").html();
    var tm = $("#total-muertos").html();
    $.post("apps/ppr/dd/dd.mec.morfila.php", { fecha: fecha, avi: avi, lote: lote, fila: fila, valor: valor }, function (j) {
        $("#saldo").html(j.saldo);
        $("#total-muertos").html(j.muertos);
        $("#total-morfilas").html(j.muertos);
        $("#pmort").html(j.pmort);
        if (j.mornoclas > 0) {
            $("#mornoclas").html(j.mornoclas).addClass("bg-red");
            $("#total-muertos").addClass("bg-red");
        } else {
            $("#total-muertos").removeClass("bg-red");
            $("#mornoclas").html(j.mornoclas).removeClass("bg-red");
        }
        $("#mlave").html(j.mlave);
    });
}
function ppr_dd_mec_morclas(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.morclas.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 1) {
            alert(j.errormsg);
        } else if (j.error == 2) {
            $("#" + campo)
                .html("")
                .focus();
            alert(j.errormsg);
        } else if (j.error == 0) {
            if (j.mornoclas == 0) {
                $("#total-muertos").removeClass("bg-red");
                $("#mornoclas").removeClass("bg-red");
            } else {
                $("#total-muertos").addClass("bg-red");
                $("#mornoclas").addClass("bg-red");
            }
            $("#mornoclas").html(j.mornoclas);
        }
    });
}
function ppr_dd_mec_balkg(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.balkg.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 0) {
            $("#baltotal").html(j.balkg);
            $("#balkg").html(j.balkg);
            $("#balave").html(j.balave);
        } else {
            alert(j.errormsg);
        }
    });
}
function ppr_dd_mec_huevos(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.huevos.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 0) {
            $("#henday").html(j.henday);
        } else {
            alert(j.errormsg);
        }
    });
}
function ppr_dd_mec_caudal(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.caudal.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 0) {
            $("#litros1").html(j.litros);
            $("#litros2").html(j.litros);
            $("#mlave").html(j.mlave);
        } else {
            alert(j.errormsg);
        }
    });
}
function ppr_dd_mec_caudal2(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.caudal2.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 0) {
            $("#litros1").html(j.litros);
            $("#litros2").html(j.litros);
            $("#mlave").html(j.mlave);
        } else {
            alert(j.errormsg);
        }
    });
}
function ppr_dd_mec_temp(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.temp.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 1) {
            alert(j.errormsg);
        }
    });
}
function ppr_dd_mec_transferin(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.transferin.php", { fecha: fecha, avi: avi, lote: lote, valor: valor }, function (j) {
        $("#saldo").html(j.saldo);
        $("#henday").html(j.henday);
        $("#balave").html(j.balave);
        $("#mlave").html(j.mlave);
    });
}
function ppr_dd_mec_transferout(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.transferout.php", { fecha: fecha, avi: avi, lote: lote, valor: valor }, function (j) {
        $("#saldo").html(j.saldo);
        $("#henday").html(j.henday);
        $("#balave").html(j.balave);
        $("#mlave").html(j.mlave);
    });
}
function ppr_dd_mec_ajuste(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.ajuste.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 0) {
            $("#saldo").html(j.saldo);
            $("#henday").html(j.henday);
            $("#balave").html(j.balave);
            $("#mlave").html(j.mlave);
        } else {
            alert(j.errormsg);
        }
    });
}
function ppr_dd_mec_venta(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.venta.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 0) {
            $("#saldo").html(j.saldo);
            $("#henday").html(j.henday);
            $("#balave").html(j.balave);
            $("#mlave").html(j.mlave);
        } else {
        }
    });
}
function ppr_dd_mec_anota(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.anota.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 1) {
            alert(j.errormsg);
        }
    });
}
function ppr_dd_mec_calcico(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/dd/dd.mec.calcico.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        if (j.error == 0) {
        } else {
        }
    });
}
function ppr_dd_mec_falla_form(fecha, avi) {
    $("#popup").modal("show");
    $.get("apps/ppr/dd/dd.mec.falla.form.php", { fecha: fecha, avi: avi }, function (res) {
        $("#popup-content").html(res);
        $("#falla-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_dd_mec_falla_reg(fecha, avi);
        });
        var lista = new Bloodhound({ datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"), queryTokenizers: Bloodhound.tokenizers.whitespace, prefetch: "apps/ppr/dd/dd.mec.falla.lista.php" });
        $("#tfalla").typeahead(null, {});
    });
}
function ppr_dd_mec_falla_lista() {}
function ppr_dd_mec_falla_reg(fecha, avi) {
    var tfalla = $("#tfalla").val();
    var fanota = $("#fanota").val();
    loading("Registrando falla...");
    $.post("apps/ppr/dd/dd.mec.falla.reg.php", { fecha: fecha, avi: avi, tfalla: tfalla, fanota: fanota }, function () {
        loadingClose();
    });
}
function ppr_dd_avilot_form(avi) {
    $("#popup").modal("show");
    var f = $("#fecha").val();
    $.post("apps/ppr/dd/dd.avilot.form.php", { avi: avi, f: f }, function (res) {
        $("#popup-content").html(res);
        $("#avilot-form").on("submit", function (e) {
            e.preventDefault();
            ppr_dd_avilot_reg(avi, f);
        });
    });
}
function ppr_dd_avilot_reg(avi, f) {
    var l = $("#avilot-lote").val();
    loader("#popup-content");
    $.post("apps/ppr/dd/dd.avilot.reg.php", { avi: avi, f: f, l: l }, function () {
        $("#popup").modal("hide");
        ppr_dd(f);
    });
}
function ppr_dd_avilot_inact_adv(avi, lote) {
    var f = $("#fecha").val();
    $("#popup").modal("show");
    loader("#popup-content");
    $.post("apps/ppr/dd/dd.avilot.inact.adv.php", { avi: avi, lote: lote }, function (res) {
        $("#popup-content").html(res);
        $("#dd-aviina-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_dd_avilot_inact_reg(avi, lote, f);
        });
    });
}
function ppr_dd_avilot_inact_reg(avi, lote, f) {
    $.post("apps/ppr/dd/dd/dd.avilot.inact.reg.php", { a: avi, l: lote, f: f }, function () {
        ppr_dd(f);
    });
}
function ppr_c_dd() {
    loading("Cargando formulario...");
    var f = $("#fecha").val();
    $.get("apps/ppr/c.dd/c.dd.php", { f: f }, function (res) {
        $("#contenido").html(res);
        ppr_c_dd_onselect(f);
        $("#fecha")
            .datepicker({ language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                ppr_c_dd($(this).val());
            });
        loadingClose();
    });
}
function ppr_c_dd_onselect(f) {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            celda_editable_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var fecha = $("#fecha").val();
                var avi = this.getAttribute("avi");
                var lote = this.getAttribute("lote");
                var conv = this.getAttribute("conv");
                var campo = this.getAttribute("campo");
                if (conv == 1) {
                    if (campo == "dl_muertos" || campo == "dl_venta" || campo == "dl_elim") {
                        ppr_c_dd_mermas(fecha, avi, lote, campo, valor);
                    } else if (campo == "dl_ajuste") {
                        ppr_c_dd_ajuste(fecha, avi, lote, valor);
                    } else if (campo == "dl_hcarton1" || campo == "dl_hcarton2" || campo == "dl_hunidades") {
                        ppr_c_dd_huevos(fecha, avi, lote, valor, campo);
                    } else if (campo == "dl_balkg") {
                        ppr_c_dd_balkg(fecha, avi, lote, valor, campo);
                    } else if (campo == "dl_transferin") {
                        ppr_c_dd_transferin(fecha, avi, lote, valor);
                    } else if (campo == "dl_transferout") {
                        ppr_c_dd_transferout(fecha, avi, lote, valor);
                    }
                }
            }
        };
    }
}
function ppr_c_dd_mermas(fecha, avi, lote, campo, valor) {
    $.post("apps/ppr/c.dd/c.dd.mermas.php", { fecha: fecha, avi: avi, lote: lote, campo: campo, valor: valor }, function (j) {
        $("#dl_saldoaves-" + avi + "-" + lote).html(j.saldo);
        $("#dl_henday-" + avi + "-" + lote).html(j.henday);
        $("#dl_balave-" + avi + "-" + lote).html(j.grave);
    });
}
function ppr_c_dd_ajuste(fecha, avi, lote, valor) {
    $.post("apps/ppr/c.dd/c.dd.ajuste.php", { fecha: fecha, avi: avi, lote: lote, valor: valor }, function (j) {
        $("#dl_saldoaves-" + avi + "-" + lote).html(j.saldo);
        $("#dl_henday-" + avi + "-" + lote).html(j.henday);
        $("#dl_balave-" + avi + "-" + lote).html(j.grave);
    });
}
function ppr_c_dd_transferin(fecha, avi, lote, valor) {
    $.post("apps/ppr/c.dd/c.dd.transferin.php", { fecha: fecha, avi: avi, lote: lote, valor: valor }, function (j) {
        $("#dl_saldoaves-" + avi + "-" + lote).html(j.saldo);
        $("#dl_henday-" + avi + "-" + lote).html(j.henday);
        $("#dl_balave-" + avi + "-" + lote).html(j.grave);
    });
}
function ppr_c_dd_transferout(fecha, avi, lote, valor) {
    $.post("apps/ppr/c.dd/c.dd.transferout.php", { fecha: fecha, avi: avi, lote: lote, valor: valor }, function (j) {
        $("#dl_saldoaves-" + avi + "-" + lote).html(j.saldo);
        $("#dl_henday-" + avi + "-" + lote).html(j.henday);
        $("#dl_balave-" + avi + "-" + lote).html(j.grave);
    });
}
function ppr_c_dd_huevos(fecha, avi, lote, valor, campo) {
    $.post("apps/ppr/c.dd/c.dd.huevos.php", { fecha: fecha, avi: avi, lote: lote, valor: valor, campo: campo }, function (j) {
        $("#huevos-" + avi + "-" + lote).html(j.huevos);
        $("#henday-" + avi + "-" + lote).html(j.henday);
    });
}
function ppr_c_dd_balkg(fecha, avi, lote, valor, campo) {
    $.post("apps/ppr/c.dd/c.dd.balkg.php", { fecha: fecha, avi: avi, lote: lote, valor: valor, campo: campo }, 
    function (j) {
        $("#balave-" + avi + "-" + lote).html(j.balave);
    });
}
function ppr_c_dd_aviina(avi) {
    loader("#cdd-content");
    $.post("apps/ppr/c.dd/c.dd.aviina.php", { avi: avi }, function () {
        var f = $("#fecha").val();
        $.post("apps/ppr/c.dd/c.dd.php", { f: f }, function (res) {
            $("#cdd-content").html(res);
            ppr_c_dd_onselect(f);
        });
    });
}
function ppr_c_dd_avilot_form(avi) {
    $("#popup").modal("show");
    var f = $("#fecha").val();
    $.post("apps/ppr/dd/c.dd.avilot.form.php", { avi: avi, f: f }, function (res) {
        $("#popup-content").html(res);
        $("#c-avilot-form").on("submit", function (e) {
            e.preventDefault();
            ppr_c_dd_avilot_reg(avi, f);
        });
    });
}
function ppr_c_dd_avilot_reg(avi, f) {
    var l = $("#c-avilot-lote").val();
    loader("#popup-content");
    $.post("apps/ppr/dd/c.dd.avilot.reg.php", { avi: avi, f: f, l: l }, function () {
        $("#popup").modal("hide");
        $.post("apps/ppr/dd/c.dd.php", { f: f }, function (res) {
            $("#cdd-content").html(res);
            ppr_c_dd_onselect(f);
        });
    });
}
function ppr_stlotes2() {
    loading();
    $.get("apps/ppr/st2/stlote.php", function (res) {
        $("#contenido").html(res);
        $("#stlote-options").on("submit", function (ev) {
            ev.preventDefault();
            ppr_stlotes2_form();
        });
        $("#fecha")
            .datepicker({ format: "dd/mm/yyyy", language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                $("#checklist_box").html("");
            });
        $("#aviario").on("click", function () {
            $(this).select();
        });
        $("#aviario").on("change", function () {
            $("#checklist_box").html("");
        });
        $("#opera").on("click", function () {
            $(this).select();
        });
        $.get(
            "apps/ppr/st2/stlote.aviarios.php",
            function (data) {
                $("#aviario").typeahead({ source: data });
            },
            "json"
        );
        var url_ope = "apps/ppr/st2/stlote.operarios.php";
        $("#opera").typeahead({
            source: function (query, process) {
                $.get(url_ope, { query: query }, function (data) {
                    process(data);
                });
            },
            afterSelect: function (item) {
                $("#opera").attr("idope", item.id);
            },
        });
        loadingClose();
    });
}
function ppr_stlotes2_form() {
    var fecha = $("#fecha").val();
    var aviario = $("#aviario").val();
    var opera = $("#opera").attr("idope");
    loader("#checklist_box");
    $.post("apps/ppr/st2/stlote.form.php", { fecha: fecha, aviario: aviario, opera: opera }, function (res) {
        $("#checklist_box").html(res);
        ppr_stlotes2_onselect();
    });
}
function ppr_stlotes2_onselect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            ppr_stlotes_selectElement();
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var campo = this.getAttribute("id");
                var split_campo = campo.split("-");
                var id = split_campo[1];
                ppr_stlotes2_comenta(id, valor);
            }
        };
    }
}
function ppr_stlotes2_comenta(id, comenta) {
    var fecha = $("#fecha").val();
    var aviario = $("#aviario").val();
    var operario = $("#opera").val();
    $.post("apps/ppr/st2/estado.comenta.php", { id: id, com: comenta, fecha: fecha, avi: aviario, ope: operario }, function () {});
}
function ppr_stlotes2_procesar(name, valor) {
    var name_split = name.split("-");
    var id = name_split[1];
    var fecha = $("#fecha").val();
    var aviario = $("#aviario").val();
    var operario = $("#opera").val();
    $.post("apps/ppr/st2/stlote.procesar.php", { id: id, valor: valor, fecha: fecha, aviario: aviario, operario: operario }, function (json) {
        var opt_si_box = $("#opt-si-box-" + id);
        var opt_si = $("#opt-si-" + id);
        var opt_no_box = $("#opt-no-box-" + id);
        var opt_no = $("#opt-no-" + id);
        if (json.valor == "t") {
            opt_si_box.addClass("bg-red");
            opt_no_box.removeClass("bg-green");
            opt_si.prop("checked", true);
            opt_no.prop("checked", false);
        } else if (json.valor == "f") {
            opt_si_box.removeClass("bg-red");
            opt_no_box.addClass("bg-green");
            opt_si.prop("checked", false);
            opt_no.prop("checked", true);
            $("#comenta-" + id).html("");
        }
    });
}
function ppr_stlotes_onselect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            ppr_stlotes_selectElement();
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var campo = this.getAttribute("id");
                var split_campo = campo.split("-");
                var id = split_campo[1];
                ppr_stlotes_comenta(id);
            }
        };
    }
}
function ppr_stlotes_selectElement(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
function ppr_info_stlotes() {
    $("#contenido").html('<p class="text-center blink"><i class="fa fa-clock-o"></i> cargando datos...</p>');
    $.get("apps/ppr/estado.lote/info.estado.lote.php", function (res) {
        $("#contenido").html(res);
    });
}
function ppr_st3_ini() {
    loading("");
    $.get("apps/ppr/st3/st.ini.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function ppr_st3_rut() {
    loading("");
    $.get("apps/ppr/st3/st.rut.php", {}, function (res) {
        $("#contenido").html(res);
        $("#stlote-options").on("submit", function (ev) {
            ev.preventDefault();
            ppr_st3_rut_form();
        });
        $("#fecha")
            .datepicker({ format: "dd/mm/yyyy", language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                $("#checklist_box").html("");
            });
        $("#aviario").on("click", function () {
            $(this).select();
        });
        $("#aviario").on("change", function () {
            $("#checklist_box").html("");
        });
        $.get(
            "apps/ppr/st3/st.aviarios.php",
            function (data) {
                $("#aviario").typeahead({ source: data });
            },
            "json"
        );
        var url_ope = "apps/ppr/st3/st.operarios.php";
        $("#opera").typeahead({
            source: function (query, process) {
                $.get(url_ope, { query: query }, function (data) {
                    process(data);
                });
            },
            afterSelect: function (item) {
                $("#opera").attr("idope", item.id);
            },
        });
        loadingClose();
    });
}
function ppr_st3_rut_form() {
    var fecha = $("#fecha").val();
    var aviario = $("#aviario").val();
    var opera = $("#opera").attr("idope");
    loader("#checklist_box");
    $.post("apps/ppr/st3/st.rut.form.php", { fecha: fecha, aviario: aviario, opera: opera }, function (res) {
        $("#checklist_box").html(res);
        ppr_st3_onselect();
    });
}
function ppr_st3_prof() {
    loading("");
    $.get("apps/ppr/st3/st.prof.php", {}, function (res) {
        $("#contenido").html(res);
        $("#stprof-options").on("submit", function (ev) {
            ev.preventDefault();
            ppr_st3_prof_form();
        });
        $("#fecha")
            .datepicker({ format: "dd/mm/yyyy", language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                $("#checklist_box").html("");
            });
        $("#aviario").on("click", function () {
            $(this).select();
        });
        $("#aviario").on("change", function () {
            $("#checklist_box").html("");
        });
        $.get(
            "apps/ppr/st3/st.aviarios.php",
            function (data) {
                $("#aviario").typeahead({ source: data });
            },
            "json"
        );
        var url_ope = "apps/ppr/st3/st.operarios.php";
        $("#opera").typeahead({
            source: function (query, process) {
                $.get(url_ope, { query: query }, function (data) {
                    process(data);
                });
            },
            afterSelect: function (item) {
                $("#opera").attr("idope", item.id);
            },
        });
        loadingClose();
    });
}
function ppr_st3_prof_form() {
    var fecha = $("#fecha").val();
    var aviario = $("#aviario").val();
    var opera = $("#opera").attr("idope");
    loader("#checklist_box");
    $.post("apps/ppr/st3/st.prof.form.php", { fecha: fecha, aviario: aviario, opera: opera }, function (res) {
        $("#checklist_box").html(res);
        ppr_st3_onselect();
    });
}
function ppr_st3_onselect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            celda_editable_selectElement();
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var campo = this.getAttribute("id");
                var split_campo = campo.split("-");
                var id = split_campo[1];
                ppr_st3_comenta(id, valor);
            }
        };
    }
}
function ppr_st3_comenta(id, comenta) {
    var fecha = $("#fecha").val();
    var aviario = $("#aviario").val();
    var operario = $("#opera").val();
    $.post("apps/ppr/st3/st.comenta.php", { id: id, com: comenta, fecha: fecha, avi: aviario, ope: operario }, function () {});
}
function ppr_st3_procesar(name, valor) {
    var name_split = name.split("-");
    var id = name_split[1];
    var fecha = $("#fecha").val();
    var aviario = $("#aviario").val();
    var operario = $("#opera").val();
    $.post("apps/ppr/st3/st.procesar.php", { id: id, valor: valor, fecha: fecha, aviario: aviario, operario: operario }, function (json) {
        var opt_si_box = $("#opt-si-box-" + id);
        var opt_si = $("#opt-si-" + id);
        var opt_no_box = $("#opt-no-box-" + id);
        var opt_no = $("#opt-no-" + id);
        if (json.valor == "t") {
            opt_si_box.addClass("bg-red");
            opt_no_box.removeClass("bg-green");
            opt_si.prop("checked", true);
            opt_no.prop("checked", false);
        } else if (json.valor == "f") {
            opt_si_box.removeClass("bg-red");
            opt_no_box.addClass("bg-green");
            opt_si.prop("checked", false);
            opt_no.prop("checked", true);
            $("#comenta-" + id).html("");
        }
    });
}
function ppr_subpro() {
    loading("");
    $.get("apps/ppr/subpro/subpro.ini.php", {}, function (res) {
        $("#contenido").html(res);
        $("#subpro-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_subpro_reg();
        });
        $("#fecha")
            .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
            .on("changeDate", function (ev, picker) {
                ppr_subpro_datos();
                $(this).datepicker("hide");
            });
        $("#fp")
            .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
            .on("change", function () {
                $(this).datepicker("hide");
            });
        $("#carton")
            .on("change", function () {
                ppr_subpro_calculo();
            })
            .on("click", function () {
                $(this).select();
            });
        $("#unidades")
            .on("change", function () {
                ppr_subpro_calculo();
            })
            .on("click", function () {
                $(this).select();
            });
        ppr_subpro_datos();
        loadingClose();
    });
}
function ppr_subpro_calculo() {
    var b = parseInt($("#carton").val());
    var u = parseInt($("#unidades").val());
    var t = b * 30 + u;
    $("#huevos").val(t);
}
function ppr_subpro_datos() {
    var fecha = $("#fecha").val();
    loading("");
    $.get("apps/ppr/subpro/subpro.datos.php", { fecha: fecha }, function (res) {
        $("#lista").html(res);
        loadingClose();
    });
}
function ppr_subpro_reg() {
    var fecha = $("#fecha").val();
    var doc = $("#docnum").val();
    var fp = $("#fp").val();
    var car = $("#carton").val();
    var uni = $("#unidades").val();
    var hue = $("#huevos").val();
    if (hue > 0) {
        $.get("apps/ppr/subpro/subpro.reg.php", { fecha: fecha, docnum: doc, fp: fp, car: car, uni: uni, hue: hue }, function (res) {
            $("#fp").val(fecha);
            $("#carton").val("0");
            $("#unidades").val("0");
            $("#huevos").val("0");
            ppr_subpro_datos();
        });
    }
}
function ppr_subpro_delete(id) {
    Swal.fire({
        title: "Atención!",
        text: "Seguro que quiere borrar el registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Borrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            ppr_subpro_delete_exe(id);
        }
    });
}
function ppr_subpro_delete_exe(id) {
    $.get("apps/ppr/subpro/subpro.delete.php", { id: id }, function () {
        ppr_subpro_datos();
    });
}
function ppr_ovo() {
    $.ajax({
        url: "apps/ppr/ovo/ovo.ini.php",
        success: function (res) {
            $("#contenido").html(res);
            $("#ovo-form").on("submit", function (ev) {
                ev.preventDefault();
                ppr_ovo_reg();
            });
            $("#fecha")
                .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
                .on("changeDate", function (ev, picker) {
                    ppr_ovo_datos();
                    $(this).datepicker("hide");
                });
            $("#fp")
                .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
                .on("changeDate", function () {
                    $(this).datepicker("hide");
                });
            $("#carton").on("change", function () {
                ppr_ovo_calculo();
            });
            $("#unidades").on("change", function () {
                ppr_ovo_calculo();
            });
            ppr_ovo_datos();
        },
    });
}
function ppr_ovo_calculo() {
    var b = parseInt($("#carton").val());
    var u = parseInt($("#unidades").val());
    var t = b * 30 + u;
    $("#huevos").val(t);
}
function ppr_ovo_datos() {
    var fecha = $("#fecha").val();
    loading("");
    $.get("apps/ppr/ovo/ovo.datos.php", { fecha: fecha }, function (res) {
        $("#lista").html(res);
        loadingClose();
    });
}
function ppr_ovo_reg() {
    var fecha = $("#fecha").val();
    var doc = $("#docnum").val();
    var fp = $("#fp").val();
    var car = $("#carton").val();
    var uni = $("#unidades").val();
    var hue = $("#huevos").val();
    if (hue > 0) {
        $.get("apps/ppr/ovo/ovo.reg.php", { fecha: fecha, docnum: doc, fp: fp, car: car, uni: uni, hue: hue }, function (res) {
            $("#fp").val(fecha);
            $("#carton").val("0");
            $("#unidades").val("0");
            $("#huevos").val("0");
            ppr_ovo_datos();
        });
    }
}
function ppr_ovo_delete(id) {
    Swal.fire({
        title: "Atención!",
        text: "Seguro que quiere borrar el registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Borrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            ppr_ovo_delete_exe(id);
        }
    });
}
function ppr_ovo_delete_exe(id) {
    $.get("apps/ppr/ovo/ovo.delete.php", { id: id }, function () {
        ppr_ovo_datos();
    });
}
function ppr_necropsias() {
    loader("#contenido");
    $.get("apps/ppr/necropsias/necropsias.ini.php", function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_necropsias_lista();
        });
        $("#fini")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function ppr_necropsias_lista() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/ppr/necropsias/necropsias.ini.lista.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
        $("#tabla-pnec").dataTable();
    });
}
function ppr_necropsias_delete(id) {
    $.post("apps/ppr/necropsias/necropsias.delete.php", { id: id }, function () {
        ppr_necropsias();
    });
}
function ppr_necropsias_form(f) {
    $("#necro-form-box").modal("show");
    $.post("apps/ppr/necropsias/necropsias.form.php", { f: f }, function (res) {
        $("#ppr-necro-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_necropsias_reg();
        });
        $("#fecha")
            .datepicker({ format: "dd/mm/yyyy", language: "es" })
            .on("changeDate", function () {
                $("#fecha").datepicker("hide");
            });
    });
}
function ppr_necropsias_form_check() {
    var fecha = $("#fecha").val();
    var lote = $("#lote").val();
    if (fecha == "" || lote == "") {
        $("#btnReg").attr("disabled", "disabled");
    } else {
        $("#btnReg").removeAttr("disabled");
    }
}
function ppr_necropsias_reg() {
    var fecha = $("#fecha").val();
    var lote = $("#lote").val();
    loading("");
    $.post("apps/ppr/necropsias/necropsias.reg.php", { f: fecha, l: lote }, function (j) {
        $("#ppr-necro-form")[0].reset();
        $("#necro-form-box").modal("hide");
        if (j.cnec == 1) {
            ppr_necropsias_form_detalle(j.fid);
        }
        loadingClose();
    });
}
function ppr_necropsias_form_detalle(f) {
    loading("");
    $.post("apps/ppr/necropsias/necropsias.form.detalle.php", { f: f }, function (res) {
        $("#datos").html(res);
        ppr_necropsias_form_detalle_onselect();
        loadingClose();
    });
}
function ppr_necropsias_form_detalle_onselect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            rec_necropsias_form_detalle_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig") || this.innerHTML == "") {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var campo = this.getAttribute("id");
                ppr_necropsias_form_detalle_reg(campo, valor);
            }
        };
    }
}
function ppr_necropsias_form_detalle_selectElement(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
function ppr_necropsias_form_detalle_reg(campo, valor) {
    $.post("apps/ppr/necropsias/necropsias.score.reg.php", { campo: campo, valor: valor }, function (j) {});
}
function ppr_necropsias_form_nuevafila() {
    var id = $("#pnec-id").val();
    var items = $("#pnec-items").val();
    var conteo = parseInt($("#last-sco").val());
    var spt = items.split(",");
    var cant_items = spt[0];
    var s = "";
    s += "<tr>";
    s += '<td class="text-center">' + (conteo + 1) + "</td>";
    for (var c = 1; c <= cant_items; c++) {
        s += '<td class="celda_editable single_line text-center" contentEditable="true" id="itm-' + id + "-" + (conteo + 1) + "-" + spt[c] + '" tabindex="' + ((conteo + 1) * 1000 + c) + '">';
    }
    s += '<td><button class="btn btn-outline-info btn-xs" onclick="ppr_necropsias_files(\'' + id + "','" + (conteo + 1) + "');\">ver archivos</button></td>";
    s += "</tr>";
    $("#tabla-sco tbody").append(s);
    $("#last-sco").val(conteo + 1);
    ppr_necropsias_form_detalle_onselect();
}
function ppr_necropsias_files(id, ave) {
    $.post("apps/ppr/necropsias/necropsias.files.php", { id: id, ave: ave }, function (res) {
        $("#listaArchivos").html(res);
        ppr_necropsias_files_preview(id, ave);
        $("#archivos")
            .fileinput({
                language: "es",
                allowedPreviewTypes: ["image", "html", "video"],
                uploadUrl: "apps/ppr/necropsias/necropsias.files.upload.php?id=" + id + "&ave=" + ave,
                uploadExtraData: function () {
                    return { id: id, ave: ave };
                },
            })
            .on("filebatchuploadcomplete", function (event, files, extra) {
                ppr_necropsias_files_preview(id, ave);
            });
    });
}
function ppr_necropsias_files_preview(id, ave) {
    $.post("apps/ppr/necropsias/necropsias.files.preview.php", { id: id, ave: ave }, function (res) {
        $("#archivos_preview").html(res);
    });
}
function ppr_pesajes() {
    $.get("apps/ppr/pesaje/pesaje.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pesajes_datos();
        });
        $("#fini")
            .datepicker({ language: "es", format: "dd/mm/yyyy", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ language: "es", format: "dd/mm/yyyy", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function ppr_pesajes_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    loading("");
    $.get("apps/ppr/pesaje/pesaje.datos.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
        $("#tabla-pesaje").dataTable({
            language: { decimal: ",", thousands: "." },
            columnDefs: [{ targets: [1, 3, 4, 5, 6], searchable: false, orderable: false }],
            autowidth: false,
            aoColumns: [{ sType: "date-uk" }, null, null, null, null, null, null, null],
        });
        loadingClose();
    });
}
function ppr_pesajes_form(id) {
    if (id == "") {
        $("#pesaje-form-box").modal("show");
        $("#ppr-pesaje-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pesajes_reg(id);
        });
        $("#ppr-pesaje-form")[0].reset();
        $("#fecha")
            .datepicker({ language: "es", format: "dd/mm/yyyy", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#responsable").on("click", function () {
            $(this).select();
        });
        $.get(
            "apps/ppr/pesaje/pesaje.operarios.php",
            function (data) {
                $("#responsable").typeahead({ source: data });
            },
            "json"
        );
    } else {
        ppr_pesajes_formdet(id);
    }
}
function ppr_pesaje_del(id) {
    Swal.fire({
        title: "Atención!",
        text: "Seguro que quiere borrar el registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Borrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            ppr_pesaje_del_exe(id);
        }
    });
}
function ppr_pesaje_del_exe(id) {
    $.get("apps/ppr/pesaje/pesaje.del.php", { id: id }, function () {
        ppr_pesajes_datos();
    });
}
function ppr_pesajes_reg() {
    loading("");
    var fecha = $("#fecha").val();
    var lote = $("#lote").val();
    var respo = $("#responsable").val();
    $.get("apps/ppr/pesaje/pesaje.reg.php", { fecha: fecha, lote: lote, respo: respo }, function (j) {
        loadingClose();
        $("#pesaje-form-box").modal("hide");
        ppr_pesajes_formdet(j.id);
    });
}
function ppr_pesajes_formdet(id) {
    loading("");
    $.get("apps/ppr/pesaje/pesaje.form.php", { id: id }, function (res) {
        $("#datos").html(res);
        ppr_pesaje_formdet_onSelect();
        loadingClose();
    });
}
function ppr_pesaje_formdet_onSelect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            celda_editable_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var fecha = this.getAttribute("fecha");
                var ave = this.getAttribute("ave");
                var lote = this.getAttribute("lote");
                var grupo = this.getAttribute("grupo");
                var idpes = this.getAttribute("idpes");
                ppr_pesajes_formdet_reg(idpes, fecha, lote, grupo, ave, valor);
            }
        };
    }
}
function ppr_pesajes_formdet_reg(idpes, fecha, lote, grupo, ave, peso) {
    $.get("apps/ppr/pesaje/pesaje.detalle.reg.php", { idpes: idpes, fecha: fecha, lote: lote, grupo: grupo, ave: ave, peso: peso }, function (j) {
        $("#caves-" + grupo).html(j.caves);
        $("#pprom-" + grupo).html(j.pprom);
        $("#pmax-" + grupo).html(j.pmax);
        $("#pmin-" + grupo).html(j.pmin);
    });
}
function ppr_aviarios() {
    loader("#contenido");
    $.get("apps/ppr/aviarios/aviarios.php", {}, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_aviarios_act(avi, act) {
    $.post("apps/ppr/aviarios/aviarios.act.php", { avi: avi, act: act }, function () {
        ppr_aviarios();
    });
}
function ppr_lotes(ver) {
    loader("#contenido");
    $.post("apps/ppr/lotes/lotes.php", { ver: ver }, function (res) {
        $("#contenido").html(res);
        $("#ver").on("change", function () {
            ppr_lotes($(this).val());
        });
    });
}
function ppr_lotes_saldoaves_update(avi, lote) {
    loading("Aguarde un momento...");
    $.get("apps/ppr/lotes/lotes.saldoaves.update.php", { avi: avi, lote: lote }, function (j) {
        $("body").loadingModal("hide");
    });
}
function ppr_lote_resumen(lote) {
    var act = $("#ver").val();
    loader("#contenido");
    $.get("apps/ppr/lotes/lotes.resumen.php", { lote: lote, act: act }, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_lote_avilot(avi, lot) {
    loading("");
    $("#popup").modal("show");
    $.get("apps/ppr/lotes/lotes.avilote.mov.php", { avi: avi, lot: lot }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
    });
}
function ppr_lote_act(lote) {
    var act = $("#btn-act-" + lote).attr("action");
    $.get("apps/ppr/lotes/lote.act.php", { lote: lote, act: act }, function (j) {
        if (j.estado == 1) {
            $("#btn-act-" + j.lote)
                .removeClass("btn-danger")
                .addClass("btn-success")
                .attr("action", 0)
                .html("Activo");
        } else if (j.estado == 0) {
            $("#btn-act-" + j.lote)
                .removeClass("btn-success")
                .addClass("btn-danger")
                .attr("action", 1)
                .html("Inactivo");
        }
    });
}
function ppr_productos() {
    loader("#contenido");
    $.get("apps/ppr/productos/productos.php", {}, function (res) {
        $("#contenido").html(res);
        ppr_productos_lista();
    });
}
function ppr_productos_lista() {
    loader("#datos");
    $.get("apps/ppr/productos/productos.lista.php", {}, function (res) {
        $("#datos").html(res);
    });
}
function ppr_productos_form(id) {
    $("#popbox").modal("show");
    $.get("apps/ppr/productos/productos.form.php", { id: id }, function (res) {
        $("#popbox").html(res);
        $("#form-productos").submit(function (ev) {
            ev.preventDefault();
            ppr_productos_reg();
        });
    });
}
function ppr_productos_reg() {
    var datos = $("#form-productos").serialize();
    $("#popbox").html("");
    var url = "apps/ppr/productos/productos.reg.php?" + datos;
    console.log(url);
    $.get(url, {}, function (j) {
        $("#popbox").modal("hide");
        ppr_productos_lista();
    });
}
function ppr_mtv(ano) {
    loader("#contenido");
    $.post("apps/ppr/mtv/mtv.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_mtv($("#ano").val());
        });
        $("#tabla-mtv").dataTable({
            autoWidth: false,
            order: [[2, "desc"]],
            columnDefs: [
                { orderable: false, targets: [5, 6] },
                { searchable: false, targets: [6] },
            ],
            aoColumns: [null, null, { sType: "date-uk" }, { sType: "date-uk" }, null, null, null],
        });
    });
}
function ppr_mtv_form(id, ano) {
    $("#popup").modal("show");
    $.post("apps/ppr/mtv/mtv.form.php", { id: id }, function (res) {
        $("#popup-content").html(res);
        $("#mtv-form").on("submit", function (e) {
            e.preventDefault();
            ppr_mtv_reg(id, ano);
        });
        $.get(
            "apps/ppr/mtv/mtv.aviarios.php",
            function (data) {
                $("#avi").typeahead({
                    source: data,
                    afterSelect: function (item) {
                        ppr_mtv_lote();
                    },
                });
            },
            "json"
        );
        $("#avi").on("click", function () {
            $(this).select();
        });
        $("#fini")
            .datepicker({ format: "dd/mm/yyyy", language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ format: "dd/mm/yyyy", language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function ppr_mtv_lote() {
    var avi = $("#avi").val();
    $.get("apps/ppr/mtv/mtv.lote.php", { avi: avi }, function (j) {
        $("#lote").val(j.lotename);
        $("#lote").attr("idlote", j.loteid);
    });
}
function ppr_mtv_reg(id, ano) {
    var avi = $("#avi").val();
    var lote = $("#lote").attr("idlote");
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    var tipo = $("#tipo").val();
    var desc = $("#desc").val();
    $.post("apps/ppr/mtv/mtv.reg.php", { avi: avi, lote: lote, id: id, fini: fini, ffin: ffin, tipo: tipo, desc: desc }, function () {
        $("#popup").modal("hide");
        ppr_mtv(ano);
    });
}
function ppr_san_tratamientos() {
    $.get("apps/ppr/sanidad/tratamientos.php", {}, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_san_tratamientos_datos() {}
function ppr_confprod(ano, mes) {
    loader("#contenido");
    $.get("apps/ppr/conprod/conprod.php", { ano: ano, mes: mes }, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_cprod() {
    loader("#contenido");
    $.get("apps/ppr/conprod/cprod.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            ppr_cprod_datos();
        });
    });
}
function ppr_cprod_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    loading("Consultando la Base de Datos. Aguarde un momento por favor...");
    $.get("apps/ppr/conprod/cprod.datos.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function ppr_contador() {
    loader("#contenido");
    $.get("apps/ppr/contador/contador.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
        });
        $("#avi").change(function () {
            $("#datos").html("");
            ppr_contador_datos();
        });
        $("#fecha")
            .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                $("#datos").html("");
                ppr_contador_datos();
            });
    });
}
function ppr_contador_datos() {
    var fecha = $("#fecha").val();
    var avi = $("#avi").val();
    if (fecha != "" && avi != "") {
        loader("#datos");
        $.get("apps/ppr/contador/contador.datos.php", { fecha: fecha, avi: avi }, function (res) {
            $("#datos").html(res);
            ppr_contador_onselect();
        });
    } else {
        $("#datos").html("");
    }
}
function ppr_contador_onselect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            celda_editable_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var fecha = this.getAttribute("fecha");
                var avi = this.getAttribute("avi");
                var fila = this.getAttribute("fila");
                var lote = this.getAttribute("lote");
                ppr_contador_reg(fecha, avi, lote, fila, valor);
            }
        };
    }
}
function ppr_contador_reg(fecha, avi, lote, fila, valor) {
    var phen = $("#phen").val();
    $.get("apps/ppr/contador/contador.reg.php", { fecha: fecha, avi: avi, lote: lote, fila: fila, cant: valor, phen: phen }, function (j) {
        $("#henday").val(j.henday);
        $("#huevos").val(j.huevos);
        $("#diff").val(j.diffp);
        if (j.diff >= 0) {
            $("#diff").addClass("custom-is-valid").removeClass("custom-is-invalid");
        } else {
            $("#diff").removeClass("custom-is-valid").addClass("custom-is-invalid");
        }
    });
}
function ppr_ceco(ano) {
    loader("#contenido");
    $.get("apps/ppr/ceco/ceco.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_ceco_resumen($(this).val());
        });
        ppr_ceco_resumen($("#ano").val());
    });
}
function ppr_ceco_resumen(ano) {
    loader("#resumen");
    $.get("apps/ppr/ceco/ceco.resumen.php", { ano: ano }, function (res) {
        $("#resumen").html(res);
        $("#ceco-mes").html("");
        $("#ceco-mes-detalle").html("");
    });
}
function ppr_ceco_mes(ano, mes) {
    loader("#ceco-mes");
    $.get("apps/ppr/ceco/ceco.mes.php", { ano: ano, mes: mes }, function (res) {
        $("#ceco-mes").html(res);
        $("#tabla-ceco tbody tr").removeClass("highlight");
        $("#mes-" + mes).addClass("highlight");
        $("#ceco-ceco").html("");
        $("#ceco-detalle").html("");
    });
}
function ppr_ceco_ceco(ano, mes, cta, cou) {
    loader("#ceco-ceco");
    $.get("apps/ppr/ceco/ceco.ctacontable.php", { ano: ano, mes: mes, cta: cta }, function (res) {
        $("#ceco-ceco").html(res);
        $("#tabla-ceco-mes tbody tr").removeClass("highlight");
        $("#ceco-mes-" + cou).addClass("highlight");
    });
}
function ppr_ceco_detalle(ano, mes, cta) {
    loader("#ceco-detalle");
    $.get("apps/ppr/ceco/ceco.detalles.php", { ano: ano, mes: mes, cta: cta }, function (res) {
        $("#ceco-detalle").html(res);
    });
}
function ppr_ceco_completo(ano) {
    loader("#contenido");
    $.get("apps/ppr/ceco/ceco.completo.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#tabla-ceco").dataTable({ language: { decimal: ",", thousands: "." }, autoWidth: false, aoColumns: [{ sType: "date-uk" }, null, null, null, null, null, null] });
    });
}
function ppr_adv_sincmec() {
    loading("Cargando lista de aviarios...");
    $.get("apps/ppr/smec/smec.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function ppr_adv_sincmec_tmor(a, f, u) {
    loading("Sincronizando datos de tipos de mortandad...");
    $.get("apps/ppr/smec/smec.tmor.php", { a: a, f: f, u: u, reg: 1 }, function () {
        loadingClose();
        ppr_adv_sincmec();
    });
}
function ppr_adv_sincmec_caudal(a, f, u) {
    loading("Sincronizando datos de caudalimetro...");
    $.get("apps/ppr/smec/smec.caudal.php", { a: a, f: f, u: u, reg: 1 }, function () {
        loadingClose();
        ppr_adv_sincmec();
    });
}
function ppr_adv_sincmec_balkg(a, f, u) {
    loading("Sincronizando datos de balanceados...");
    $.get("apps/ppr/smec/smec.balkg.php", { a: a, f: f, u: u, reg: 1 }, function () {
        loadingClose();
        ppr_adv_sincmec();
    });
}
function ppr_adv_sincmec_temp(a, f, u) {
    loading("Sincronizando datos de balanceados...");
    $.get("apps/ppr/smec/smec.temp.php", { a: a, f: f, u: u, reg: 1 }, function () {
        loadingClose();
        ppr_adv_sincmec();
    });
}
function ppr_adv_sincmec_anotaciones() {
    loading("Sincronizando anotaciones...");
    $.get("apps/ppr/smec/smec.anotaciones.php", {}, function () {
        loadingClose();
    });
}
function ppr_recopar() {
    loading("");
    $.get("apps/ppr/recopar/recopar.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_recopar_datos();
        });
        loadingClose();
    });
}
function ppr_recopar_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    loading("");
    $.get("apps/ppr/recopar/recopar.datos.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function ppr_recopar_importar() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    loading("");
    $.get("apps/ppr/recopar/recopar.importar.php", { ano: ano, mes: mes }, function (res) {
        ppr_recopar_datos();
        loadingClose();
    });
}
function ppr_recopar_resumen() {}
function ppr_balmov() {
    $.get("apps/ppr/balmov/balmov.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_balmov_datos();
        });
        $("#fini")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function ppr_balmov_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    var avi = $("#avi").val();
    var comenta = $("#comenta").val();
    loading("");
    $.get("apps/ppr/balmov/balmov.datos.php", { fini: fini, ffin: ffin, avi: avi, comenta: comenta }, function (res) {
        $("#datos").html(res);
        $("#tabla-balmov").dataTable({});
        loadingClose();
    });
}
function ppr_compara_lotes() {
    $.get("apps/ppr/comparalotes/comparalotes.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_compara_lotes_datos();
        });
    });
}
function ppr_compara_lotes_datos() {
    var ano = $("#ano").val();
    loading("");
    $.get("apps/ppr/comparalotes/comparalotes.datos.php", { ano: ano }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function ppr_compara_lotes_datolotes(lote) {
    loading("");
    $.get("apps/ppr/comparalotes/comparalotes.datolotes.php", { lote: lote }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function ppr_compara_lotes_datolotes_corregir(lote, id, edadd, edads) {
    loading("");
    $.get("apps/ppr/comparalotes/comparalotes.datolotes.corregir.php", { lote: lote, id: id, edadd: edadd, edads: edads }, function (res) {
        ppr_compara_lotes_datolotes(lote);
        loadingClose();
    });
}
function ppr_medica() {
    loading();
    $.get("apps/ppr/medica/medica.php", {}, function (res) {
        $("#contenido").html(res);
        $("#medi-form").on("submit", function (ev) {
            ev.preventDefault();
        });
        $("#medi").change(function () {
            var dosis = $(this).find(":selected").data("dosis");
            var conce = $(this).find(":selected").data("conce");
            var hdia = $(this).find(":selected").data("hdia");
            var enva = $(this).find(":selected").data("envase");
            $("#dosis").val(dosis);
            $("#conce").val(conce);
            $("#hdia").val(hdia);
            $("#gr_envase").val(enva);
        });
        $("#medi, #aves, #peso, #agua, #dosif").change(function () {
            ppr_medica_calculo();
        });
        loadingClose();
    });
}
function ppr_medica_agua_info() {
    alert("Cantidad de agua consumido durante las horas a tratar en el día. Ver datos de tiempo de distribución.");
}
function ppr_medica_calculo() {
    var medi = $("#medi").val();
    var dosis = $("#dosis").val();
    var conce = $("#conce").val();
    var aves = $("#aves").val();
    var peso = $("#peso").val();
    var agua = $("#agua").val();
    var dosif = $("#dosif").val();
    var grenva = $("#gr_envase").val();
    var kgtotal = $("#kgtotal").val();
    var kgprod = $("#kgprod").val();
    var calc_kgtotal;
    if (aves != "" && peso != "") {
        calc_kgtotal = (aves * peso) / 1000;
        $("#kgtotal").val(calc_kgtotal);
    }
    if (medi != "" && dosis != "" && conce != "" && agua != "" && kgtotal != "") {
        var calc_kgprod = Math.round10((kgtotal * (dosis / 1000)) / (conce / 100) / 1000, -3);
        $("#kgprod").val(calc_kgprod);
    }
    if (agua != "" && dosif != "") {
        var calc_solucion = Math.round10(agua * (dosif / 100), -3);
        $("#solucion").val(calc_solucion);
        var solenva = Math.ceil(kgprod / (grenva / 1000));
        $("#solenva").val(solenva);
        if (agua != "" && grenva != "" && kgprod != "") {
            var calc_solagua = Math.round10((solenva * calc_solucion) / ((kgprod / grenva) * 1000), -2);
            $("#solagua").val(calc_solagua);
        }
    }
}
function gp_prm_turnos() {
    loader("#contenido");
    $.get("apps/gp/turnos/turnos.php", {}, function (res) {
        $("#contenido").html(res);
        $("#tabla-turno").dataTable({
            scrollX: true,
            ordering: false,
            dom: "Bfrtip",
            buttons: [
                {
                    text: "Nuevo Turno",
                    action: function (e, dt, node, config) {
                        gp_prm_turno_form("");
                    },
                },
            ],
            order: [[2, "asc"]],
        });
    });
}
function gp_prm_turno_form(t) {
    loading("Cargando formulario...");
    $("#popup-content").html("");
    $("#popup").modal("show");
    $.get("apps/gp/turnos/turnos.form.php", { t: t }, function (res) {
        $("#popup-content").html(res);
        $("#turno-form").on("submit", function (e) {
            e.preventDefault();
            gp_prm_turno_reg(t);
        });
        $("#hini").inputmask("hh:mm", { placeholder: "HH:MM", oncomplete: function () {} });
        $("#hfin").inputmask("hh:mm", { placeholder: "HH:MM", oncomplete: function () {} });
        $("#dhini").inputmask("hh:mm", { placeholder: "HH:MM", oncomplete: function () {} });
        $("#dhfin").inputmask("hh:mm", { placeholder: "HH:MM", oncomplete: function () {} });
        loadingClose();
    });
}
function gp_prm_turno_reg(t) {
    var n = $("#turno").val();
    var d = $("#departamento").val();
    var c = $("#comenta").val();
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var dhini = $("#dhini").val();
    var dhfin = $("#dhfin").val();
    var jornada = $("#jornada").val();
    var sp = $("#t_sp").val();
    loading("Registrando datos de turno...");
    $.post("apps/gp/turnos/turnos.reg.php", { t: t, d: d, n: n, c: c, hini: hini, hfin: hfin, dhini: dhini, dhfin: dhfin, jornada: jornada, sp: sp }, function (j) {
        loadingClose();
        $("#popup").modal("hide");
        gp_prm_turnos();
    });
}
function gp_prm_tursp() {
    loader("#contenido");
    $.get("apps/gp/tursp/tursp.php", {}, function (res) {
        $("#contenido").html(res);
        $("#tabla-tursp").dataTable({ scrollX: true, columnDefs: [{ orderable: false, targets: [2, 3, 4, 5, 6] }] });
    });
}
function gp_prm_tursp_form(id) {
    $("#big-popup").modal("show");
    $.get("apps/gp/tursp/tursp.form.php", { id: id }, function (res) {
        $("#big-popup-content").html(res);
        $("#tursp-form").on("submit", function (ev) {
            ev.preventDefault();
            gp_prm_tursp_reg(id);
        });
        $("#hini").inputmask("hh:mm", { placeholder: "HH:MM" });
        $("#hfin").inputmask("hh:mm", { placeholder: "HH:MM" });
        $("#dhini").inputmask("hh:mm", { placeholder: "HH:MM" });
        $("#dhfin").inputmask("hh:mm", { placeholder: "HH:MM" });
    });
}
function gp_prm_tursp_reg(id) {
    var dep = $("#departamento").val();
    var name = $("#name").val();
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var dhini = $("#dhini").val();
    var dhfin = $("#dhfin").val();
    var obs = $("#obs").val();
    var htotal = $("#htotal").val();
    var hdescanso = $("#hdescanso").val();
    var htrabajo = $("#htrabajo").val();
    var hjornada = $("#hjornada").val();
    var hexc = $("#hexc").val();
    var htn = $("#htn").val();
    var hed = $("#hed").val();
    var hen = $("#hen").val();
    var hefd = $("#hefd").val();
    var hefn = $("#hefn").val();
    var hedld = $("#hedld").val();
    var hedln = $("#hedln").val();
    $.post(
        "apps/gp/tursp/tursp.reg.php",
        {
            id: id,
            dep: dep,
            name: name,
            hini: hini,
            hfin: hfin,
            dhini: dhini,
            dhfin: dhfin,
            obs: obs,
            htotal: htotal,
            hdescanso: hdescanso,
            htrabajo: htrabajo,
            hjornada: hjornada,
            hexc: hexc,
            htn: htn,
            hed: hed,
            hen: hen,
            hefd: hefd,
            hefn: hefn,
            hedld: hedld,
            hedln: hedln,
        },
        function (j) {
            $("#big-popup-content").html("");
            $("#big-popup").modal("hide");
            gp_prm_tursp();
        }
    );
}
function gp_prm_tursp_estado(id, st) {
    $.get("apps/gp/tursp/tursp.estado.php", { id: id, st: st }, function () {
        gp_prm_tursp();
    });
}
function gp_funcionarios() {
    loader("#contenido");
    $.get("apps/gp/funcionarios/funcionarios.php", {}, function (res) {
        $("#contenido").html(res);
        var fecha = $("#fecha").val();
        $("#tabla-funcionarios").dataTable({
            scrollX: true,
            dom: "Bfrtip",
            language: { url: "js/bower_components/datatables.net/i18n/Spanish.json" },
            order: [[1, "asc"]],
            buttons: [{ extend: "copy", text: '<i class="fa fa-clipboard"></i> Copiar' }, { extend: "excel", text: '<i class="fa fa-file-excel-o"></i> MS Excel', title: "Lista de Funcionarios - " + fecha }, "csv"],
        });
    });
}
function gp_asicheck() {
    loader("#contenido");
    $.get("apps/gp/asicheck/asicheck.php", {}, function (res) {
        $("#contenido").html(res);
        $("#asicheck-table").dataTable();
    });
}
function gp_asicheck_det(fecha, fun) {
    $("#popup").modal("show");
    $.post("apps/gp/asicheck/asicheck.det.php", { fecha: fecha, fun: fun }, function (res) {
        $("#popup-content").html(res);
    });
}
function gp_asicheck_reg(fecha, fun, id, opt) {
    $.post("apps/gp/asicheck/asicheck.reg.php", { id: id, opt: opt, fecha: fecha, fun: fun }, function (j) {
        if (j.conteo > 1) {
            gp_asicheck_det(fecha, fun);
        } else {
            $("#popup").modal("hide");
            gp_asicheck();
            check_adv();
        }
    });
}
function gp_heman() {
    loader("#contenido");
    $.get("apps/gp/heman/heman.php", {}, function (res) {
        $("#contenido").html(res);
        $("#fecha")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                gp_heman_tcalc();
            });
        $("#heman-form").on("submit", function (ev) {
            ev.preventDefault();
            gp_heman_reg();
        });
        $("#fini")
            .inputmask("hh:mm", {
                placeholder: "HH:MM",
                oncomplete: function () {
                    gp_heman_tcalc();
                },
            })
            .on("change", function () {
                gp_heman_tcalc();
            });
        $("#ffin")
            .inputmask("hh:mm", {
                placeholder: "HH:MM",
                oncomplete: function () {
                    gp_heman_tcalc();
                },
            })
            .on("change", function () {
                gp_heman_tcalc();
            });
        $("#dini")
            .inputmask("hh:mm", {
                placeholder: "HH:MM",
                oncomplete: function () {
                    gp_heman_tcalc();
                },
            })
            .on("change", function () {
                gp_heman_tcalc();
            });
        $("#dfin")
            .inputmask("hh:mm", {
                placeholder: "HH:MM",
                oncomplete: function () {
                    gp_heman_tcalc();
                },
            })
            .on("change", function () {
                gp_heman_tcalc();
            });
        $("#jornada").on("change", function () {
            gp_heman_tcalc();
        });
        $("#legajo").on("change", function () {
            gp_heman_calc();
        });
        $("#htn").on("change", function () {
            gp_heman_calc();
        });
        $("#hed").on("change", function () {
            gp_heman_calc();
        });
        $("#hen").on("change", function () {
            gp_heman_calc();
        });
        $("#hexc").on("change", function () {
            gp_heman_calc();
        });
        $("#hefd").on("change", function () {
            gp_heman_calc();
        });
        $("#hefn").on("change", function () {
            gp_heman_calc();
        });
        $("#hedl").on("change", function () {
            gp_heman_hedl();
        });
        $("#error-msg-hexc-1").hide();
        $("#error-msg-hexc-2").hide();
        $("#error-msg-htn-1").hide();
        $("#error-msg-htn-2").hide();
        $("#legajo-msg").hide();
        $("#btn-reg").hide();
    });
}
function gp_heman_tcalc() {
    var fecha = $("#fecha").val();
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var dini = $("#dini").val();
    var dfin = $("#dfin").val();
    var jornada = $("#jornada").val();
    $.get("apps/gp/heman/heman.tcalc.php", { hini: hini, hfin: hfin, dini: dini, dfin: dfin, jornada: jornada }, function (j) {
        $("#hexc").val(j.hexc);
        $("#htrab").val(j.htrab);
        $("#hdesc").val(j.hdesc);
        $("#htn").val(j.hnoc);
        $("#htotal").val(j.htotal);
        if (j.feriado1 == 1 || j.feriado2 == 1) {
            $("#hefd").removeAttr("disabled");
        } else {
            $("#hefd").prop({ disabled: "disabled" });
        }
        if (j.hnoc > 0) {
            $("#hen").removeAttr("disabled");
            if (j.feriado1 == 1 || j.feriado2 == 1) {
                $("#hefn").removeAttr("disabled");
            }
        } else {
            $("#hen").prop({ disabled: "disabled" });
            $("#hefn").prop({ disabled: "disabled" });
        }
        if (j.hexc > 0) {
            $("#hed").removeAttr("disabled");
        } else {
            $("#hed").prop({ disabled: "disabled" });
        }
        gp_heman_calc();
    });
}
function gp_heman_hedl() {
    var htrab = $("#htrab").val();
    var hedl = $("#hedl").val();
    if (hedl > 0) {
        $("#hed").val(0).prop({ disabled: "disabled" });
        $("#hen").val(0).prop({ disabled: "disabled" });
        $("#hefd").val(0).prop({ disabled: "disabled" });
        $("#hefn").val(0).prop({ disabled: "disabled" });
        $("#hedl").val(htrab);
        $("#error-msg-hexc-1").hide();
        $("#error-msg-hexc-2").hide();
        $("#error-msg-htn-1").hide();
        $("#error-msg-htn-2").hide();
    } else {
        gp_heman_tcalc();
    }
}
function gp_heman_calc() {
    var legajo = $("#legajo").val();
    if (legajo != "") {
        $("#legajo-msg").hide();
        var htn = $("#htn").val();
        var hexc = $("#hexc").val();
        var hed = $("#hed").val();
        var hen = $("#hen").val();
        var hedl = $("#hedl").val();
        var hefd = $("#hefd").val();
        var hefn = $("#hefn").val();
        $.get("apps/gp/heman/heman.calc.php", { legajo: legajo, htn: htn, hexc: hexc, hed: hed, hen: hen, hedl: hedl, hefd: hefd, hefn: hefn }, function (j) {
            var error = 0;
            if (hedl == 0) {
                if (j.error_hexc == "1") {
                    error = 1;
                    $("#error-msg-hexc-1").show();
                    $("#btn-reg").hide();
                } else {
                    $("#error-msg-hexc-1").hide();
                }
                if (j.error_hexc == "2") {
                    error = 1;
                    $("#error-msg-hexc-2").show();
                    $("#btn-reg").hide();
                } else {
                    $("#error-msg-hexc-2").hide();
                }
                if (j.error_htn == "1") {
                    $("#error-msg-htn-1").show();
                } else {
                    $("#error-msg-htn-1").hide();
                }
                if (j.error_htn == "2") {
                    $("#error-msg-htn-2").show();
                } else {
                    $("#error-msg-htn-2").hide();
                }
                if (j.error_hexc == 0 && j.error_htn == 0) {
                    error = 0;
                }
                if (error == 1) {
                    $("#btn-reg").hide();
                } else if (error == 0) {
                    if (hexc > 0 || htn > 0) {
                        $("#btn-reg").show();
                    } else {
                        $("#btn-reg").hide();
                    }
                }
            } else {
                if ($("#legajo").val() != "") {
                    $("#btn-reg").show();
                } else {
                    $("#btn-reg").hide();
                    $("#legajo-msg").show();
                }
            }
            $("#he_total").val(j.he_total);
            $("#fullname").val(j.fullname);
            $("#salario").val(j.salario);
            $("#jornal").val(j.jornal);
            $("#jornald").val(j.jornald);
            $("#jornalh").val(j.jornalh);
            $("#t-total").val(j.t_total);
            $("#t_hexc").val(j.t_hexc);
            $("#t_htn").val(j.t_htn);
            $("#t_hed").val(j.t_hed);
            $("#t_hen").val(j.t_hen);
            $("#t_hefd").val(j.t_hefd);
            $("#t_hefn").val(j.t_hefn);
            $("#t_hedl").val(j.t_hedl);
        });
    } else {
        $("#btn-reg").hide();
        $("#legajo-msg").show();
        $("#fullname").val("");
        $("#salario").val("");
        $("#jornal").val("");
        $("#jornald").val("");
        $("#jornalh").val("");
        $("#t-total").val("");
        $("#t_hexc").val("");
        $("#t_htn").val("");
        $("#t_hed").val("");
        $("#t_hen").val("");
        $("#t_hefd").val("");
        $("#t_hefn").val("");
        $("#t_hedl").val("");
    }
}
function gp_heman_reg() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    var dini = $("#dini").val();
    var dfin = $("#dfin").val();
    var jornada = $("#jornada").val();
    var comentario = $("#comentario").val();
    var htotal = $("#htotal").val();
    var hdesca = $("#hdesc").val();
    var htrab = $("#htrab").val();
    var legajo = $("#legajo").val();
    var htn = $("#htn").val();
    var hexc = $("#hexc").val();
    var hed = $("#hed").val();
    var hen = $("#hen").val();
    var hedl = $("#hedl").val();
    var hefd = $("#hefd").val();
    var hefn = $("#hefn").val();
    $.post(
        "apps/gp/heman/heman.reg.php",
        {
            legajo: legajo,
            fini: fini,
            ffin: ffin,
            dini: dini,
            dfin: dfin,
            jornada: jornada,
            comentario: comentario,
            htotal: htotal,
            hdesca: hdesca,
            htrab: htrab,
            htn: htn,
            hexc: hexc,
            hed: hed,
            hen: hen,
            hedl: hedl,
            hefd: hefd,
            hefn: hefn,
        },
        function (j) {
            $("#legajo").val("");
            gp_heman_calc();
        }
    );
}
function gp_cierres(ano) {
    loading("");
    $.get("apps/gp/cierres/cierres.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            gp_cierres($(this).val());
        });
        $("#tabla-cierres").dataTable({ scrollX: true, ordering: false, searching: false, paging: false });
        loadingClose();
    });
}
function gp_cierres_pre_ini(cierre) {
    loading("");
    $.get("apps/gp/cierres/pre/pre.cierre.php", { cierre: cierre }, function (res) {
        $("#contenido").html(res);
        $("#tabla-precierres").dataTable({});
        loadingClose();
    });
}
function gp_cierres_pre_depincl(asic, dep, depname, eje) {
    var registro = $("#dep-" + asic + "-" + dep).attr("registro");
    if (registro == 0) {
        Swal.fire({
            title: "H. Extras - Cierre / Departamento",
            text: "Agregar el Departamento " + depname + " al Cierre?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Agregar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                gp_cierres_pre_depincl_exe(asic, dep, eje);
            }
        });
    } else {
        Swal.fire({
            title: "H. Extras - Cierre / Departamento",
            text: "Quitar el Departamento " + depname + " del Cierre?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, Quitar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                gp_cierres_pre_depdel_exe(asic, dep, eje);
            }
        });
    }
}
function gp_cierres_pre_depincl_exe(asic, dep, eje) {
    $.get("apps/gp/cierres/pre/pre.depincl.php", { asi: asic, dep: dep }, function (j) {
        if (j.registro == 1) {
            $("#dep-" + asic + "-" + dep)
                .removeClass("btn-outline-secondary")
                .addClass("btn-success")
                .attr("registro", "1");
            gp_cierres_pre_exedep(asic, dep, 1);
        } else {
            $("#dep-" + asic + "-" + dep)
                .removeClass("btn-success")
                .addClass("btn-outline-secondary")
                .attr("registro", "0");
            gp_cierres_pre_exedep(asic, dep, 0);
        }
    });
}
function gp_cierres_pre_depdel_exe(asic, dep, eje) {
    $.get("apps/gp/cierres/pre/pre.depdel.php", { asi: asic, dep: dep }, function (j) {
        if (j.registro == 1) {
            $("#dep-" + asic + "-" + dep)
                .removeClass("btn-outline-secondary")
                .addClass("btn-success")
                .attr("registro", "1");
            gp_cierres_pre_exedep(asic, dep, 1);
        } else {
            $("#dep-" + asic + "-" + dep)
                .removeClass("btn-success")
                .addClass("btn-outline-secondary")
                .attr("registro", "0");
            gp_cierres_pre_exedep(asic, dep, 0);
        }
    });
}
function gp_cierres_pre_exe(asic) {
    $.get("apps/gp/cierres/pre/pre.deps.php", { asi: asic }, function (j) {
        var tot = j.totalregs;
        var con = 0;
        $(j.departamentos).each(function (i, obj) {
            con++;
            gp_cierres_pre_exedep(asic, obj.departamento, 1);
            if (con == tot) {
                gp_cierres_pre_ini(asic);
            }
        });
    });
}
function gp_cierres_pre_exedep(asic, dep, tipo) {
    loading("Procesando operación...");
    $.get("apps/gp/cierres/pre/pre.exedep.php", { asi: asic, dep: dep, tipo: tipo }, function (j) {
        loadingClose();
    });
}
function gp_cierres_pre_depincl2(asic, dep, depname, eje) {
    var registro = $("#dep-" + asic + "-" + dep).attr("registro");
    if (registro == 0) {
        Swal.fire({
            title: "H. Extras - Cierre / Departamento",
            text: "Agregar el Departamento " + depname + " al Cierre?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Agregar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                gp_cierres_pre_depincl2_exe(asic, dep, eje);
            }
        });
    } else {
        Swal.fire({
            title: "H. Extras - Cierre / Departamento",
            text: "Quitar el Departamento " + depname + " del Cierre?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, Quitar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                gp_cierres_pre_depdel2_exe(asic, dep, eje);
            }
        });
    }
}
function gp_cierres_pre_depincl2_exe(asic, dep, eje) {
    $.get("apps/gp/cierres/pre/pre.depincl.php", { asi: asic, dep: dep }, function (j) {
        if (j.registro == 1) {
            $("#dep-" + asic + "-" + dep)
                .removeClass("btn-outline-secondary")
                .addClass("btn-success")
                .attr("registro", "1");
            gp_cierres_pre_exedep2(asic, dep, 1);
        } else {
            $("#dep-" + asic + "-" + dep)
                .removeClass("btn-success")
                .addClass("btn-outline-secondary")
                .attr("registro", "0");
            gp_cierres_pre_exedep2(asic, dep, 0);
        }
    });
}
function gp_cierres_pre_depdel2_exe(asic, dep, eje) {
    $.get("apps/gp/cierres/pre/pre.depdel.php", { asi: asic, dep: dep }, function (j) {
        if (j.registro == 1) {
            $("#dep-" + asic + "-" + dep)
                .removeClass("btn-outline-secondary")
                .addClass("btn-success")
                .attr("registro", "1");
            gp_cierres_pre_exedep2(asic, dep, 1);
        } else {
            $("#dep-" + asic + "-" + dep)
                .removeClass("btn-success")
                .addClass("btn-outline-secondary")
                .attr("registro", "0");
            gp_cierres_pre_exedep2(asic, dep, 0);
        }
    });
}
function gp_cierres_pre_exedep2(asic, dep, tipo) {
    loading("Procesando operación...");
    $.get("apps/gp/cierres/pre/pre.exedep.php", { asi: asic, dep: dep, tipo: tipo }, function (j) {
        gp_cierres_pre_ini(asic);
        loadingClose();
    });
}
function gp_cierres_penadd(asic, asi) {
    loading("Procesando operación...");
    $.get("apps/gp/cierres/pre/pre.penadd.php", { asic: asic, asi: asi }, function (j) {
        gp_cierres_pre_exe(asic);
        loadingClose();
    });
}
function gp_cierres_execonf(asic) {
    Swal.fire({
        title: "ATENCION!",
        text: "Seguro que quiere ejecutar el cierre del periodo?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, Cerrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gp_cierres_exe(asic);
        }
    });
}
function gp_cierres_exe(asic) {
    loading("Procesando cierre...");
    $.get("apps/gp/cierres/cierres.exe.php", { asic: asic }, function (j) {
        gp_cierres_info(asic, j.ano, j.mes, j.messtr);
        loadingClose();
    });
}
function gp_cierres_info(asic, ano, mes, messtr) {
    loading("Procesando informe...");
    $.get("apps/gp/cierres/cierres.info.php", { asic: asic }, function (res) {
        $("#contenido").html(res);
        var filename = "Cierre Horas Extras - " + ano + "" + dos_dig(mes) + " - " + ano + "-" + messtr;
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        if (column == 4 || column == 5 || column == 6 || column == 7 || column == 8 || column == 28) {
                            dato = data.replace(/[$.]/g, "");
                        } else if (column == 9 || column == 10 || column == 12 || column == 14 || column == 16 || column == 18 || column == 20 || column == 22 || column == 24 || column == 26) {
                            dato = data.replace(/[$,]/g, ".");
                        } else {
                            dato = data;
                        }
                        return dato;
                    },
                },
            },
        };
        $("#tabla-cierres").dataTable({
            scrollX: true,
            dom: "Bfrtip",
            buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", title: filename })],
            columnDefs: [
                { targets: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 31], searchable: false, orderable: false },
                { targets: [9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32], visible: false },
            ],
        });
        loadingClose();
    });
}
function gp_cierres_info_detalle(asi) {
    loading("");
    $("#popup").modal("show");
    $.get("apps/gp/cierres/cierres.info.detalle.php", { asi: asi }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
    });
}
function gp_feriados(ano) {
    loading("");
    $.get("apps/gp/feriados/feriados.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            gp_feriados($(this).val());
        });
        loadingClose();
    });
}
function gp_feriados_anu_form(ano) {}
function gp_feriados_anu_reg(ano) {}
function gp_hexinfo() {
    loader("#contenido");
    $.get("apps/gp/hexinfo/hexinfo.php", {}, function (res) {
        $("#contenido").html(res);
        $("#fini").inputmask({
            alias: "date",
            inputFormat: "dd/mm/yyyy",
            placeholder: "dd/mm/aaaa",
            oncomplete: function () {
                gp_hexinfo_datos();
            },
        });
        $("#ffin").inputmask({
            alias: "date",
            inputFormat: "dd/mm/yyyy",
            placeholder: "dd/mm/aaaa",
            oncomplete: function () {
                gp_hexinfo_datos();
            },
        });
    });
}
function gp_hexinfo_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    if (fini != "" && ffin != "") {
        loader("#datos");
        $.get("apps/gp/hexinfo/hexinfo.datos.php", { fini: fini, ffin: ffin }, function (res) {
            $("#datos").html(res);
        });
    }
}
function gp_legajo() {
    loader("#contenido");
    $.get("apps/gp/legajo/legajo.php", {}, function (res) {
        $("#contenido").html(res);
    });
}
function gp_biometricos(fecha, dep) {
    loading("");
    $.post("apps/gp/biometricos/biometricos.php", { fecha: fecha, dep: dep }, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            gp_biometricos($("#fecha").val(), $("#departamento").val());
        });
        $("#tabla-bio").dataTable({ scrollX: true, paging: false, columnDefs: [{ orderable: false, targets: [3, 4, 5, 6, 7] }], order: [[1, "asc"]] });
        $("#fecha")
            .datepicker({ language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
    loadingClose();
}
function gp_biometricos_datos() {}
function gp_resulic(f) {
    loading("");
    $.get("apps/gp/resulic/resulic.php", { fecha: f }, function (res) {
        $("#contenido").html(res);
        $("#fecha")
            .datepicker({ language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                gp_resulic($(this).val());
            });
        $("#tabla-resulic").dataTable({ scrollX: true, paging: false, columnDefs: [{ orderable: false, targets: [3, 4, 5, 6, 7] }], order: [[1, "asc"]] });
        loadingClose();
    });
}
function gp_resulic_form(l) {
    var f = $("#fecha").val();
    $("#popup").modal("show");
    loader("#popup-content");
    $.post("apps/gp/resulic/resulic.form.php", { f: f, l: l }, function (res) {
        $("#popup-content").html(res);
        $("#resulic-form").on("submit", function (e) {
            e.preventDefault();
            gp_resulic_reg(l);
        });
        $("#fini")
            .datepicker({ language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                gp_resulic_recalc(l, $(this).val(), $("#tmov").val());
            });
        $("#tmov").on("change", function () {
            gp_resulic_datos(l, $("#fini").val(), $(this).val());
        });
        $("#dias").on("change", function () {
            gp_resulic_recalc(l, $("#fini").val(), $("#tmov").val());
        });
        $("#comenta").on("focus", function () {
            $(this).select();
        });
    });
}
function gp_resulic_datos(l, f, t) {
    $.get("apps/gp/resulic/resulic.datos.php", { l: l, t: t, f: f }, function (j) {
        if (j.vdias == 1) {
            $("#dias").val(j.dias).removeAttr("disabled");
            $("#ffin").val(j.ffin);
        } else {
            $("#dias").val(j.dias).prop({ disabled: "disabled" });
            $("#ffin").val(j.ffin);
        }
        $("#feriados").val(j.feriados);
        $("#domingos").val(j.domingos);
        $("#desc").val(j.hdescuento);
        $("#odesc").val(j.odescuento);
        gp_resulic_recalc(l, f, t);
    });
}
function gp_resulic_recalc(l, f, t) {
    var d = $("#dias").val();
    loading("Recalculando...");
    $.get("apps/gp/resulic/resulic.recalc.php", { l: l, f: f, t: t, d: d }, function (j) {
        $("#ffin").val(j.ffin);
        $("#feriados").val(j.feriados);
        $("#domingos").val(j.domingos);
        loadingClose();
    });
}
function gp_resulic_reg(legajo) {
    var fini = $("#fini").val();
    var tmov = $("#tmov").val();
    var dias = $("#dias").val();
    var ffin = $("#ffin").val();
    var desc = $("#desc").val();
    var odesc = $("#odesc").val();
    var comenta = $("#comenta").val();
    loading("Registrando...");
    $.get("apps/gp/resulic/resulic.reg.php", { legajo: legajo, fini: fini, tmov: tmov, dias: dias, ffin: ffin, desc: desc, odesc: odesc, comenta: comenta }, function () {
        $("#popup-content").html("");
        $("#popup").modal("hide");
        loadingClose();
        gp_resulic(fini);
    });
}
function gp_horamen() {
    $.get("apps/gp/horamen/horamen.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            gp_horamen_exe();
        });
    });
}
function gp_horamen_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    $("#datos").html("");
    loading("Consultando la Base de Datos");
    $.get("apps/gp/horamen/horamen.datos.php", { mes: mes, ano: ano }, function (res) {
        $("#datos").html(res);
        $("#btn-exe").removeAttr("disabled");
        gp_horamen_resumen();
        loadingClose();
    });
}
function gp_horamen_exe_conf() {
    Swal.fire({
        title: "ATENCION!",
        text: "Seguro que quiere ejecutar el cálculo?. Este proceso tarda aprox. 5 minutos y no debe interrumpir el proceso",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, Procesar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gp_horamen_exe();
        }
    });
}
function gp_horamen_exe() {
    var dep = $("#dep").val();
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    loading("Calculando y Registrando datos de Horas Hombres. Aguarde un momento...");
    $.get("apps/gp/horamen/horamen.exe.php", { dep: dep, mes: mes, ano: ano }, function (j) {
        loadingClose();
        $("#btn-exe").attr("disabled", "disabled");
        gp_horamen_datos();
    });
}
function gp_horamen_resumen() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    $("#resumen").html("");
    loading("Generando resumen de presencias...");
    $.get("apps/gp/horamen/horamen.resumen.php", { mes: mes, ano: ano }, function (res) {
        $("#resumen").html(res);
        loadingClose();
    });
}
function gp_birthday() {
    $.get("apps/gp/birthday/birthday.php", {}, function (res) {
        $("#contenido").html(res);
        $("#birth-form").on("submit", function (ev) {
            ev.preventDefault();
            gp_birthday_datos();
        });
        gp_birthday_datos();
    });
}
function gp_birthday_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    $.get("apps/gp/birthday/birthday.datos.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        var filename = "Lista Cumpleaños - " + mes + "-" + ano;
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        dato = data;
                        return dato;
                    },
                },
            },
        };
        $("#tabla-birthday").dataTable({
            scrollX: true,
            paging: false,
            order: false,
            dom: "Bfrtip",
            buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", text: '<i class="fa fa-file-excel-o"></i> Exportar a MS Excel', title: filename, className: "btn btn-outline-secondary btn-sm" })],
        });
    });
}
function gp_vacaciones() {
    loading("");
    $.get("apps/gp/vacaciones/vacaciones.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function gp_vacaciones_programadas() {
    loading("");
    $.get("apps/gp/vacaciones/vacaciones.programadas.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function gp_vacaciones_programadas_datos() {
    var ano = $("#ano").val();
    loading("");
    $.get("apps/gp/vacaciones/vacaciones.programadas.datos.php", { ano: ano }, function (res) {
        $("#vacprog-datos").html(res);
        loadingClose();
    });
}
function gp_registros() {
    $.get("apps/gp/registros/registros.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            gp_registros_datos();
        });
        $("#fini")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function gp_registros_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/gp/registros/registros.datos.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
        var filename = "Registros de Asistencias";
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        if (column == 10) {
                            dato = data.replace(/[$.]/g, "");
                        } else if (column == 0 || column == 12) {
                            dato = "";
                        } else {
                            dato = data;
                        }
                        return dato;
                    },
                },
            },
        };
        $("#tabla-registros").dataTable({
            scrollX: true,
            autoWidth: false,
            columnDefs: [{ orderable: false, targets: [0, 6, 7, 8, 9, 11] }],
            order: [[1, "asc"]],
            dom: "Bfrtip",
            buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", text: '<i class="fa fa-file-excel-o"></i> Exportar a MS Excel', title: filename, className: "btn btn-outline-secondary btn-sm" })],
        });
    });
}
function gp_registros_anula(id) {
    Swal.fire({
        title: "ATENCION!",
        text: "Seguro que quiere ANULAR el registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, Procesar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gp_registros_anula_exe(id);
        }
    });
}
function gp_registros_anula_exe(id) {
    $.get("apps/gp/registros/registros.anula.php", { id: id }, function (j) {
        if (j.anulado > 0) {
            $("#reg-" + id).addClass("text-red text-tachado");
            $("#apro-" + id).html('<i class="fa fa-times text-red"></i>');
        }
    });
}
function gp_austipo() {
    $.get("apps/gp/austipo/austipo.php", {}, function (res) {
        $("#contenido").html(res);
    });
}
function gp_austipo_form(id) {
    $("#popup").modal("show");
    $("#austipo-form")[0].reset();
    if (id != "") {
        $.get("apps/gp/austipo/austipo.form.php", { id: id }, function (j) {
            $("#name").val(j.name);
            $("#hdesc").val(j.hdesc);
            $("#hdesco").val(j.hdesco);
            $("#activo").val(j.activo);
        });
    }
    $("#austipo-form").on("submit", function (ev) {
        ev.preventDefault();
        gp_austipo_reg(id);
    });
}
function gp_austipo_reg(id) {
    var name = $("#name").val();
    var hdesc = $("#hdesc").val();
    var hdesco = $("#hdesco").val();
    var activo = $("#activo").val();
    $.get("apps/gp/austipo/austipo.reg.php", { id: id, name: name, hdesc: hdesc, hdesco: hdesco, activo: activo }, function () {
        $("#popup").modal("hide");
        gp_austipo();
    });
}
function gp_austipo_act(id, act) {
    $.get("apps/gp/austipo/austipo.act.php", { id: id, act: act }, function () {
        gp_austipo();
    });
}
function gp_bonifam() {
    $.get("apps/gp/bonifam/bonifam.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            gp_bonifam_datos();
        });
        $("#mes").on("change", function () {
            $("#datos").html("");
        });
        $("#ano").on("change", function () {
            $("#datos").html("");
        });
    });
}
function gp_bonifam_datos() {
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    loading();
    $.get("apps/gp/bonifam/bonifam.datos.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        var filename = "Bonificación Familiar - " + ano + "-" + mes;
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        dato = data;
                        return dato;
                    },
                },
            },
        };
        $("#tabla-bonifam").dataTable({
            scrollX: true,
            autoWidth: false,
            order: [[1, "asc"]],
            dom: "Bfrtip",
            buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", text: '<i class="fa fa-file-excel-o"></i> Exportar a MS Excel', title: filename, className: "btn btn-outline-secondary btn-sm" })],
        });
        loadingClose();
    });
}
function bal_berbatchs() {
    $.get("apps/balanceados/berandebi/batchs.php", {}, function (res) {
        $("#contenido").html(res);
        $("#berbatchform").on("submit", function (ev) {
            ev.preventDefault();
            bal_berbatchs_datos();
            bal_bercatchs_silos();
        });
        $("#fini")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function bal_berbatchs_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    loading("");
    $.get("apps/balanceados/berandebi/batchs.datos.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
        $("#tabla-batchs").dataTable({ ordering: false });
        loadingClose();
    });
}
function bal_bercatchs_silos() {
    loading("");
    $.get("apps/balanceados/berandebi/batchs.silos.php", {}, function (res) {
        $("#silos").html(res);
        loadingClose();
    });
}
function bal_alarmas(ano, mes) {
    loading();
    $.get("apps/balanceados/berandebi/alarmas.php", { ano: ano, mes: mes }, function (res) {
        $("#contenido").html(res);
        $("#tabla-alarmas").dataTable({ order: [[0, "desc"]] });
        $("#filtro-form").submit(function (ev) {
            ev.preventDefault();
            var fano = $("#ano").val();
            var fmes = $("#mes").val();
            bal_alarmas(fano, fmes);
        });
        loadingClose();
    });
}
function gen_rrhh_asistencias2(f) {
    loading("Cargando lista...");
    $.post("apps/rrhh/asistencias/asi.ini.2.php", { f: f }, function (res) {
        $("#contenido").html(res);
        $("#fecha")
            .datepicker({ language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                $("#datos").html("");
            });
        $("#asi-filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_asi_lista();
        });
        loadingClose();
    });
}
function gen_rrhh_asi_lista() {
    var fecha = $("#fecha").val();
    loading("Cargando lista...");
    $.get("apps/rrhh/asistencias/asi.lista.php", { fecha: fecha }, function (res) {
        $("#datos").html(res);
        $("#tabla-rrhh-asistencia").dataTable({ ordering: false, paging: false, scrollX: true });
        loadingClose();
    });
}
function gen_rrhh_asi_dialibre() {
    var fecha = $("#fecha").val();
    loading("Cargando lista...");
    $.get("apps/rrhh/asistencias/asi.dialibre.php", { fecha: fecha }, function (res) {
        $("#datos").html(res);
        $("#tabla-rrhh-dialibre").dataTable({ ordering: false, paging: false, scrollX: true });
        loadingClose();
    });
}
function gen_rrhh_asi_dialibre_reg(fun, dl) {
    var fecha = $("#fecha").val();
    loading("");
    $.get("apps/rrhh/asistencias/asi.dialibre.reg.php", { fecha: fecha, fun: fun, dl: dl }, function (res) {
        $("#dialibre-opt-" + fun).html(res);
        loadingClose();
    });
}
function gen_rrhh_asi_opt(fun) {
    $("#popup").modal("show");
    $("#popup-content").html("");
    var f = $("#fecha").val();
    $.post("apps/rrhh/asistencias/asi.opt.php", { fun: fun, f: f }, function (res) {
        $("#popup-content").html(res);
    });
}
function gen_rrhh_asi_reginfo(fecha, fun) {
    $("#popup-content").html("");
    $.post("apps/rrhh/asistencias/asi.reginfo.php", { fecha: fecha, fun: fun }, function (res) {
        $("#popup-content").html(res);
    });
}
function gen_rrhh_asi_biocheck_detalle(fecha, legajo) {
    loading("Consultado la Base de Datos de Biométricos...");
    $("#popup").modal("show");
    $.get("apps/rrhh/asistencias/biometricos/biocheck.detalle.php", { fecha: fecha, legajo: legajo }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
    });
}
function gen_rrhh_biohist(fun) {
    $("#big-popup").modal("show");
    $.get("apps/rrhh/asistencias/historico/historico.php", { fun: fun }, function (res) {
        $("#big-popup-content").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_biohist_datos(fun);
        });
        $("#fini")
            .datepicker({ language: "es", endDate: "0D", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ language: "es", endDate: "0D", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function gen_rrhh_biohist_datos(fun) {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/rrhh/asistencias/historico/historico.datos.php", { fun: fun, fini: fini, ffin: ffin }, function (res) {
        $("#datos-biohist").html(res);
    });
}
function gen_rrhh_asi_dlibre(fun, fecha) {
    Swal.fire({
        title: "Día Libre",
        text: "Seguro que quiere registrar como su día libre?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Procesar registro",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gen_rrhh_asi_dlibre_reg(fun, fecha);
        }
    });
}
function gen_rrhh_asi_dlibre_reg(fun, fecha) {
    $("#popup").modal("hide");
    loading("Registrando día libre del funcionario");
    $.post("apps/rrhh/asistencias/dlibre/dlibre.reg.php", { fun: fun, fecha: fecha }, function (j) {
        loadingClose();
        registro_ok();
        gen_rrhh_asi_lista();
    });
}
function gen_rrhh_asi_dlibre_anula(fun, fecha) {
    Swal.fire({
        title: "Día Libre",
        text: "Seguro que quiere anular el día libre?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Anular",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gen_rrhh_asi_dlibre_anula_reg(fun, fecha);
        }
    });
}
function gen_rrhh_asi_dlibre_anula_reg(fun, fecha) {
    loading("Anulando Registro...");
    $.post("apps/rrhh/asistencias/dlibre/dlibre.anula.reg.php", { fun: fun, fecha: fecha }, function (j) {
        $("#popup-content").html("");
        $("#popup").modal("hide");
        loadingClose();
        registro_ok();
        gen_rrhh_asi_lista();
    });
}
function gen_rrhh_asi_trabdl(fun, fecha) {
    $("#popup").modal("hide");
    $("#big-popup").modal("show");
    $.post("apps/rrhh/asistencias/trabdl/trabdl.php", { fun: fun, fecha: fecha }, function (res) {
        $("#big-popup-content").html(res);
        $("#trabdl-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_asi_trabdl_reg(fun, fecha);
        });
        $("#fhini")
            .inputmask({
                alias: "datetime",
                inputFormat: "dd/mm/yyyy hh:ii",
                placeholder: "dd/mm/aaaa hh:mm",
                oncomplete: function () {
                    gen_rrhh_asi_trabdl_calc(fun, fecha);
                },
            })
            .on("change", function () {
                gen_rrhh_asi_trabdl_calc(fun, fecha);
            });
        $("#fhfin")
            .inputmask({
                alias: "datetime",
                inputFormat: "dd/mm/yyyy hh:ii",
                placeholder: "dd/mm/aaaa hh:mm",
                oncomplete: function () {
                    gen_rrhh_asi_trabdl_calc(fun, fecha);
                },
            })
            .on("change", function () {
                gen_rrhh_asi_trabdl_calc(fun, fecha);
            });
        $("#dhini")
            .inputmask({
                alias: "datetime",
                inputFormat: "dd/mm/yyyy hh:ii",
                placeholder: "dd/mm/aaaa hh:mm",
                oncomplete: function () {
                    gen_rrhh_asi_trabdl_calc(fun, fecha);
                },
            })
            .on("change", function () {
                gen_rrhh_asi_trabdl_calc(fun, fecha);
            });
        $("#dhfin")
            .inputmask({
                alias: "datetime",
                inputFormat: "dd/mm/yyyy hh:ii",
                placeholder: "dd/mm/aaaa hh:mm",
                oncomplete: function () {
                    gen_rrhh_asi_trabdl_calc(fun, fecha);
                },
            })
            .on("change", function () {
                gen_rrhh_asi_trabdl_calc(fun, fecha);
            });
    });
}
function gen_rrhh_asi_trabdl_calc(fun, fecha) {
    var fhini = $("#fhini").val();
    var fhfin = $("#fhfin").val();
    var dhini = $("#dhini").val();
    var dhfin = $("#dhfin").val();
    if (fhini != "" && fhfin != "") {
        $.get("apps/rrhh/asistencias/trabdl/trabdl.calc.php", { fun: fun, fecha: fecha, fhini: fhini, fhfin: fhfin, dhini: dhini, dhfin: dhfin }, function (j) {
            $("#htotal").val(j.htotal);
            $("#htrabajo").val(j.htrab);
            $("#hexc").val(j.hexc);
            $("#hdescanso").val(j.hdesc);
            $("#htn").val(j.htn);
            $("#hedld").val(j.hedld);
            $("#hedln").val(j.hedln);
        });
    }
}
function gen_rrhh_asi_trabdl_reg(fun, fecha) {
    var fhini = $("#fhini").val();
    var fhfin = $("#fhfin").val();
    var dhini = $("#dhini").val();
    var dhfin = $("#dhfin").val();
    var htotal = $("#htotal").val();
    var htrab = $("#htrabajo").val();
    var hexc = $("#hexc").val();
    var hdesc = $("#hdescanso").val();
    var htn = $("#htn").val();
    var hedld = $("#hedld").val();
    var hedln = $("#hedln").val();
    var comenta = $("#motivo").val();
    loading("Registrando en la Base de Datos...");
    $.post(
        "apps/rrhh/asistencias/trabdl/trabdl.reg.php",
        { fun: fun, fecha: fecha, comenta: comenta, fhini: fhini, fhfin: fhfin, dhini: dhini, dhfin: dhfin, htotal: htotal, htrab: htrab, hexc: hexc, hdesc: hdesc, htn: htn, hedld: hedld, hedln: hedln },
        function (j) {
            $("#big-popup-content").html("");
            $("#big-popup").modal("hide");
            loadingClose();
            registro_ok();
            gen_rrhh_asi_lista();
        }
    );
}
function gen_rrhh_asi_trabdl_anula(fun, fecha) {
    Swal.fire({
        title: "Trabajo en Día Libre",
        text: "Seguro que quiere anular el registro de trabajo día libre?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Anular",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gen_rrhh_asi_trabdl_anula_reg(fun, fecha);
        }
    });
}
function gen_rrhh_asi_trabdl_anula_reg(fun, fecha) {
    loading("Anulando Registro...");
    $.post("apps/rrhh/asistencias/trabdl/trabdl.anula.reg.php", { fun: fun, fecha: fecha }, function (j) {
        $("#popup-content").html("");
        $("#popup").modal("hide");
        loadingClose();
        registro_ok();
        gen_rrhh_asi_lista();
    });
}
function gen_rrhh_asi_hesp(fun, fecha) {
    $("#popup-content").html("");
    $("#popup").modal("hide");
    $("#big-popup").modal("show");
    loading("Cargando formulario...");
    $.get("apps/rrhh/asistencias/hesp/hesp.php", { fun: fun, fecha: fecha }, function (res) {
        $("#big-popup-content").html(res);
        $("#hesp-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_asi_hesp_reg(fun, fecha);
        });
        $("#fhini")
            .inputmask("hh:mm", {
                placeholder: "HH:MM",
                oncomplete: function () {
                    gen_rrhh_asi_hesp_calc(fun, fecha);
                },
            })
            .on("change", function () {
                gen_rrhh_asi_hesp_calc(fun, fecha);
            });
        $("#fhfin")
            .inputmask("hh:mm", {
                placeholder: "HH:MM",
                oncomplete: function () {
                    gen_rrhh_asi_hesp_calc(fun, fecha);
                },
            })
            .on("change", function () {
                gen_rrhh_asi_hesp_calc(fun, fecha);
            });
        loadingClose();
    });
}
function gen_rrhh_asi_hesp_calc(fun, fecha) {
    var fhini = $("#fhini").val();
    var fhfin = $("#fhfin").val();
    if (fhini != "" && fhfin != "") {
        $.post("apps/rrhh/asistencias/hesp/hesp.calc.php", { fun: fun, fecha: fecha, fhini: fhini, fhfin: fhfin }, function (j) {
            if (j.error > 0) {
                Swal.fire({ type: "error", title: "Error", text: "Recuerde que la fecha general y las fechas de inicio / final deben coincidir. Este módulo sólo acepta movimiento de inicio/fin de misma fecha." });
                $("#fhini").val("");
                $("#fhfin").val("");
                $("#htn").val("");
                $("#hexc").val("");
                $("#hed").val("");
                $("#hen").val("");
                $("#hefd").val("");
                $("#hefn").val("");
            } else {
                $("#htn").val(j.htn);
                $("#hexc").val(j.hexc);
                $("#hed").val(j.hed);
                $("#hen").val(j.hen);
                $("#hefd").val(j.hefd);
                $("#hefn").val(j.hefn);
            }
        });
    }
}
function gen_rrhh_asi_hesp_reg(fun, fecha) {
    loading("Registrando Horas Extras Especiales...");
    var fhini = $("#fhini").val();
    var fhfin = $("#fhfin").val();
    var htn = $("#htn").val();
    var hexc = $("#hexc").val();
    var hed = $("#hed").val();
    var hen = $("#hen").val();
    var hefd = $("#hefd").val();
    var hefn = $("#hefn").val();
    var comenta = $("#motivo").val();
    $.post("apps/rrhh/asistencias/hesp/hesp.reg.php", { fun: fun, fecha: fecha, fhini: fhini, fhfin: fhfin, htn: htn, hexc: hexc, hed: hed, hen: hen, hefd: hefd, hefn: hefn, comenta: comenta }, function (j) {
        $("#big-popup-content").html("");
        $("#big-popup").modal("hide");
        registro_ok();
        gen_rrhh_asi_lista();
        loadingClose();
    });
}
function gen_rrhh_asi_he(fun, f) {
    $("#popup").modal("hide");
    $("#big-popup").modal("show");
    loader("#big-popup-content");
    $.post("apps/rrhh/asistencias/hex/hex.php", { fun: fun, f: f }, function (res) {
        $("#big-popup-content").html(res);
        $("#hex-form").on("submit", function (e) {
            e.preventDefault();
            gen_rrhh_asi_he_reg(fun);
        });
        $("#msg-menos8").hide();
        $("#msg-error-over12").hide();
        $("#hini").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_asi_he_tipo(fun);
            },
        });
        $("#hfin").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_asi_he_tipo(fun);
            },
        });
        $("#dini").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_asi_he_tipo(fun);
            },
        });
        $("#dfin").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_asi_he_tipo(fun);
            },
        });
    });
}
function gen_rrhh_asi_he_tipo(fun) {
    var fecha = $("#fecha").val();
    var fini = $("#hini").val();
    var ffin = $("#hfin").val();
    if (fini != "" && ffin != "") {
        loading("Consultando tipo de movimiento...");
        $.get("apps/rrhh/asistencias/hecalc/turno.check.php", { fecha: fecha, hini: fini, hfin: ffin }, function (j) {
            $("#dhini").removeAttr("disabled");
            $("#dhfin").removeAttr("disabled");
            $("#jornada").val(j.jornada).removeAttr("disabled");
            $("#tjornada").val(j.jornada_tipo);
            $("#tmov").val(j.tipo);
            if (j.tipo == "f1d" || j.tipo == "f2d" || j.tipo == "f1n1" || j.tipo == "n1f1") {
                $("#tmov, #fecha").addClass("input-error");
            } else {
                $("#tmov, #fecha").removeClass("input-error");
            }
            loadingClose();
            gen_rrhh_asi_he_calc(j.tipo, j.jornada, j.jornada_tipo);
            $("#jornada").on("change", function () {
                gen_rrhh_asi_he_calc(j.tipo, $(this).val(), j.jornada_tipo);
            });
        });
    } else {
    }
}
function gen_rrhh_asi_he_calc(tipo, jornada, tjornada) {
    var fecha = $("#fecha").val();
    var fini = $("#hini").val();
    var ffin = $("#hfin").val();
    var dini = $("#dini").val();
    var dfin = $("#dfin").val();
    if (fini != "" && ffin != "") {
        loading("Calculando valores...");
        $.get("apps/rrhh/asistencias/hecalc/" + tipo + "/" + tipo + ".calc.php", { tipo: tipo, jornada: jornada, tjornada: tjornada, fecha: fecha, hini: fini, hfin: ffin, dini: dini, dfin: dfin }, function (j) {
            if (j.error == 0) {
                $("button[type='submit']").removeAttr("disabled");
                $("#htotal").val(j.htotal);
                $("#hdescanso").val(j.hdesc);
                $("#htn").val(j.htn);
                $("#htrab").val(j.htrab);
                $("#hexc").val(j.hexc);
                $("#hed").val(j.hed);
                $("#hen").val(j.hen);
                $("#hefd").val(j.hefd);
                $("#hefn").val(j.hefn);
                $("#hedl").val(j.hedl);
            } else {
                $("button[type='submit']").attr("disabled", "disabled");
            }
            loadingClose();
        });
    }
}
function gen_rrhh_asi_he_reg(fun) {
    var fecha = $("#fecha").val();
    var tmov = $("#tmov").val();
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var dini = $("#dini").val();
    var dfin = $("#dfin").val();
    var mot = $("#motivo").val();
    var htot = $("#htotal").val();
    var htra = $("#htrab").val();
    var hdes = $("#hdescanso").val();
    var hexc = $("#hexc").val();
    var jornada = $("#jornada").val();
    var tjornada = $("#tjornada").val();
    var htn = $("#htn").val();
    var hed = $("#hed").val();
    var hen = $("#hen").val();
    var hefd = $("#hefd").val();
    var hefn = $("#hefn").val();
    $.get(
        "apps/rrhh/asistencias/hex/hex.reg.php",
        {
            fecha: fecha,
            fun: fun,
            tmov: tmov,
            hini: hini,
            hfin: hfin,
            dini: dini,
            dfin: dfin,
            mot: mot,
            htot: htot,
            htra: htra,
            hdes: hdes,
            hexc: hexc,
            jornada: jornada,
            tjornada: tjornada,
            htn: htn,
            hed: hed,
            hen: hen,
            hefd: hefd,
            hefn: hefn,
        },
        function (j) {
            $("#big-popup").modal("hide");
            gen_rrhh_asi_lista();
        }
    );
}
function gen_rrhh_aus(fun, fecha) {
    loading("Cargando formulario...");
    $.get("apps/rrhh/asistencias/aus/aus.php", { fun: fun, fecha: fecha }, function (res) {
        $("#popup-content").html(res);
        $("#aus-form").on("submit", function (e) {
            e.preventDefault();
            gen_rrhh_aus_reg(fun);
        });
        $("#ffecha")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function (e) {
                $(this).datepicker("hide");
                gen_rrhh_aus_datos(fun);
            });
        $("#tjornada").on("change", function () {
            gen_rrhh_aus_jordet($(this).val());
        });
        gen_rrhh_aus_datos(fun);
        loadingClose();
    });
}
function gen_rrhh_aus_jordet(tj) {
    $.get("apps/rrhh/asistencias/aus/aus.tjornada.php", { tj: tj }, function (j) {
        $("#desc").val(j.hdesc);
        $("#odesc").val(j.hdesco);
    });
}
function gen_rrhh_aus_datos(fun) {
    var fecha = $("#ffecha").val();
    var t = $("#turno").val();
    $.get("apps/rrhh/asistencias/aus/aus.datos.php", { fun: fun, fecha: fecha, turno: t }, function (j) {
        if (j.feriado > 0) {
            $("#aus-form").hide();
            $("#feriado-msg").show();
        } else {
            $("#aus-form").show();
            $("#feriado-msg").hide();
            $("#btn-submit").removeAttr("disabled");
        }
    });
}
function gen_rrhh_aus_reg(fun) {
    var fecha = $("#ffecha").val();
    var tjornada = $("#tjornada").val();
    var comenta = $("#comenta").val();
    loading("Registrando ausencia...");
    $.post("apps/rrhh/asistencias/aus/aus.reg.php", { fun: fun, fecha: fecha, tjornada: tjornada, comenta: comenta }, function (j) {
        if (j.ausencias > 0 && fecha == $("#fecha").val()) {
            $("#descuentos-" + fun)
                .addClass("bg-red")
                .html('<span class="label label-warning">' + j.ausencias + "</span>");
        }
        $("#popup-content").html("");
        $("#popup").modal("hide");
        loadingClose();
    });
}
function gen_rrhh_retem(fun, fecha) {
    loading("");
    $.get("apps/rrhh/asistencias/retem/retem.php", { fun: fun, fecha: fecha }, function (res) {
        $("#popup-content").html(res);
        $("#retem-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_retem_reg(fun, fecha);
        });
        $("#hini").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_retem_calc(fun, fecha);
            },
        });
        $("#hfin").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_retem_calc(fun, fecha);
            },
        });
        loadingClose();
    });
}
function gen_rrhh_retem_calc(fun, fecha) {
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    if (hini != "" && hfin != "") {
        loading("");
        $.get("apps/rrhh/asistencias/retem/retem.calc.php", { fun: fun, fecha: fecha, hini: hini, hfin: hfin }, function (j) {
            if (j.feriado == 0) {
                if (j.error == 0) {
                    $("#horas").val(j.horas);
                    $("#btn-submit").removeAttr("disabled");
                } else {
                    $("#hini").val("");
                    $("#hfin").val("");
                    $("#horas").val("--ERROR--");
                    $("#btn-submit").attr("disabled", "disabled");
                }
            } else {
                $("#retem-form").hide();
                $("#feriado-msg").show();
            }
            loadingClose();
        });
    }
}
function gen_rrhh_retem_reg(fun, fecha) {
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var comenta = $("#comenta").val();
    loading("");
    $.post("apps/rrhh/asistencias/retem/retem.reg.php", { fun: fun, fecha: fecha, hini: hini, hfin: hfin, comenta: comenta }, function (j) {
        if (j.descuentos > 0) {
            $("#descuentos-" + fun)
                .addClass("bg-red")
                .html('<span class="label label-warning">' + j.descuentos + "</span>");
        }
        $("#popup-content").html("");
        $("#popup").modal("hide");
        loadingClose();
    });
}
function gen_rrhh_llt(fun, fecha) {
    loading("");
    $.get("apps/rrhh/asistencias/llt/llt.php", { fun: fun, fecha: fecha }, function (res) {
        $("#popup-content").html(res);
        $("#llt-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_llt_reg(fun, fecha);
        });
        $("#hini").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_llt_calc(fun, fecha);
            },
        });
        $("#hfin").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_llt_calc(fun, fecha);
            },
        });
        loadingClose();
    });
}
function gen_rrhh_llt_calc(fun, fecha) {
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    if (hini != "" && hfin != "") {
        loading("");
        $.get("apps/rrhh/asistencias/llt/llt.calc.php", { fun: fun, fecha: fecha, hini: hini, hfin: hfin }, function (j) {
            if (j.feriado == 0) {
                if (j.error == 0) {
                    $("#horas").val(j.horas);
                    $("#btn-submit").removeAttr("disabled");
                } else {
                    $("#hini").val("");
                    $("#hfin").val("");
                    $("#horas").val("--ERROR--");
                    $("#btn-submit").attr("disabled", "disabled");
                }
            } else {
                $("#llt-form").hide();
                $("#feriado-msg").show();
            }
            loadingClose();
        });
    }
}
function gen_rrhh_llt_reg(fun, fecha) {
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var comenta = $("#comenta").val();
    loading("");
    $.post("apps/rrhh/asistencias/llt/llt.reg.php", { fun: fun, fecha: fecha, hini: hini, hfin: hfin, comenta: comenta }, function (j) {
        if (j.descuentos > 0) {
            $("#descuentos-" + fun)
                .addClass("bg-red")
                .html('<span class="label label-warning">' + j.descuentos + "</span>");
        }
        $("#popup-content").html("");
        $("#popup").modal("hide");
        loadingClose();
    });
}
function gen_rrhh_hexg() {
    $("#popup").modal("hide");
    $("#btn-submit").hide();
    loading("");
    $.get("apps/rrhh/asistencias/hexg/hexg.php", {}, function (res) {
        $("#contenido").html(res);
        $("#hexg-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_hexg_reg();
        });
        $("#fecha")
            .datepicker({ language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                gen_rrhh_hexg_feriado();
                gen_rrhh_hexg_tipo();
            });
        $("#hini").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_hexg_tipo();
            },
        });
        $("#hfin").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_hexg_tipo();
            },
        });
        $("#dini").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_hexg_tipo();
            },
        });
        $("#dfin").inputmask("hh:mm", {
            placeholder: "HH:MM",
            oncomplete: function () {
                gen_rrhh_hexg_tipo();
            },
        });
        $("#datos-horarios").boxWidget({ animationSpeed: 500, collapseIcon: "fa-minus", expandIcon: "fa-plus" });
        $("#hexg-func")
            .boxWidget({ animationSpeed: 500, collapseIcon: "fa-minus", expandIcon: "fa-plus" })
            .on("collapsed.boxwidget", function () {
                $("#datos-horarios").boxWidget("expand");
            })
            .on("expanded.boxwidget", function () {
                $("#datos-horarios").boxWidget("collapse");
            });
        loadingClose();
    });
}
function gen_rrhh_hexg_feriado() {
    var fecha = $("#fecha").val();
    $.get("apps/rrhh/asistencias/hexg/hexg.feriado.php", { fecha: fecha }, function (j) {
        if (j.feriado == 1) {
            $("#feriado-msg").show();
            $("#tmov, #fecha, #hefd, #hefn").addClass("input-error");
        } else {
            $("#feriado-msg").hide();
            $("#tmov, #fecha, #hefd, #hefn").removeClass("input-error");
        }
    });
}
function gen_rrhh_hexg_tipo() {
    var fecha = $("#fecha").val();
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    if (hini != "" && hfin != "") {
        loading("Consultando tipo de movimiento...");
        $.get("apps/rrhh/asistencias/hecalc/turno.check.php", { fecha: fecha, hini: hini, hfin: hfin }, function (j) {
            $("#jornada").val(j.jornada);
            $("#tjornada").val(j.jornada_tipo);
            $("#tmov").val(j.tipo);
            loadingClose();
            gen_rrhh_hexg_existe(j.tipo, j.jornada, j.jornada_tipo);
            $("#jornada").on("change", function () {
                gen_rrhh_hexg_existe(j.tipo, $(this).val(), j.jornada_tipo);
            });
        });
    } else {
    }
}
function gen_rrhh_hexg_existe(tipo, jornada, tjornada) {
    var fecha = $("#fecha").val();
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var dini = $("#dini").val();
    var dfin = $("#dfin").val();
    if (hini != "" && hfin != "") {
        loading("Chequeando existencia de registro...");
        $.get("apps/rrhh/asistencias/hexg/hexg.existe.php", { fecha: fecha, tipo: tipo, jornada: jornada, tjornada: tjornada, hini: hini, hfin: hfin, dini: dini, dfin: dfin }, function (j) {
            if (j.hexg == null) {
                gen_rrhh_hexg_calc(tipo, jornada, tjornada);
            } else {
                $("#htotal").val(j.htot);
                $("#hdescanso").val(j.hdes);
                $("#htn").val(j.htn);
                $("#htrab").val(j.htra);
                $("#hexc").val(j.hexc);
                $("#hed").val(j.hed);
                $("#hen").val(j.hen);
                $("#hefd").val(j.hefd);
                $("#hefn").val(j.hefn);
                $("#nota").val(j.nota);
                $("button[type='submit']").attr("disabled", "disabled");
                $("#datos-horarios").boxWidget("collapse");
                $("#lista-funcs").html("Aguarde...");
                $("#hexg-func").boxWidget("expand");
                gen_rrhh_hexg_func(j.hexg);
            }
            loadingClose();
        });
    }
}
function gen_rrhh_hexg_calc(tipo, jornada, tjornada) {
    var fecha = $("#fecha").val();
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var dini = $("#dini").val();
    var dfin = $("#dfin").val();
    if (hini != "" && hfin != "") {
        loading("Calculando valores...");
        $.get("apps/rrhh/asistencias/hecalc/" + tipo + "/" + tipo + ".calc.php", { fecha: fecha, tipo: tipo, jornada: jornada, tjornada: tjornada, hini: hini, hfin: hfin, dini: dini, dfin: dfin }, function (j) {
            if (j.error == 0) {
                $("button[type='submit']").removeAttr("disabled");
                $("#htotal").val(j.htotal);
                $("#hdescanso").val(j.hdesc);
                $("#htn").val(j.htn);
                $("#htrab").val(j.htrab);
                $("#hexc").val(j.hexc);
                $("#hed").val(j.hed);
                $("#hen").val(j.hen);
                $("#hefd").val(j.hefd);
                $("#hefn").val(j.hefn);
            } else {
                $("button[type='submit']").attr("disabled", "disabled");
            }
            loadingClose();
        });
    }
}
function gen_rrhh_hexg_reg() {
    var fecha = $("#fecha").val();
    var hini = $("#hini").val();
    var hfin = $("#hfin").val();
    var dini = $("#dini").val();
    var dfin = $("#dfin").val();
    var tjor = $("#tjornada").val();
    var jor = $("#jornada").val();
    var tmov = $("#tmov").val();
    var htot = $("#htotal").val();
    var hdes = $("#hdescanso").val();
    var htra = $("#htrab").val();
    var hexc = $("#hexc").val();
    var htn = $("#htn").val();
    var hed = $("#hed").val();
    var hen = $("#hen").val();
    var hefd = $("#hefd").val();
    var hefn = $("#hefn").val();
    var nota = $("#nota").val();
    $.post(
        "apps/rrhh/asistencias/hexg/hexg.reg.php",
        { fecha: fecha, hini: hini, hfin: hfin, dini: dini, dfin: dfin, tjor: tjor, jor: jor, tmov: tmov, htot: htot, hdes: hdes, htra: htra, hexc: hexc, htn: htn, hed: hed, hen: hen, hefd: hefd, hefn: hefn, nota: nota },
        function (j) {
            if (j.hexg != null) {
                $("#datos-horarios").addClass("collapsed-box");
                $("#hexg-func").boxWidget("expand");
                gen_rrhh_hexg_func(j.hexg);
            } else {
                $("#datos-horarios").boxWidget("expand");
                $("#lista-funcs").html("");
            }
        }
    );
}
function gen_rrhh_hexg_func(hexg) {
    loading("Cargando lista de funcionarios...");
    $.get("apps/rrhh/asistencias/hexg/hexg.funcs.php", { hexg: hexg }, function (res) {
        $("#lista-funcs").html(res);
        loadingClose();
    });
}
function gen_rrhh_hexg_funcreg(hexg, fun, opt) {
    spinner("#st-" + fun);
    spinner("opt-" + fun);
    $.get("apps/rrhh/asistencias/hexg/hexg.funcreg.php", { hexg: hexg, fun: fun, opt: opt }, function (j) {
        if (j.st == 1) {
            $("#st-" + fun).html('<i class="fa fa-check fa-lg text-green"></i>');
            $("#opt-" + fun).html('<i class="fa fa-minus-circle fa-lg text-red solo-dedito" onclick="gen_rrhh_hexg_funcreg(\'' + hexg + "','" + fun + "','f')\"></i>");
        } else {
            $("#st-" + fun).html('<i class="fa fa-times fa-lg text-red"></i>');
            $("#opt-" + fun).html('<i class="fa fa-plus-circle fa-lg text-green solo-dedito" onclick="gen_rrhh_hexg_funcreg(\'' + hexg + "','" + fun + "','t')\"></i>");
        }
    });
}
function gen_rrhh_asi_tursp(fun, fecha) {
    $("#popup").modal("hide");
    $("#big-popup").modal("show");
    loader("#big-popup-content");
    $.get("apps/rrhh/asistencias/tursp/tursp.php", { fun: fun, fecha: fecha }, function (res) {
        $("#big-popup-content").html(res);
        $("#tursp-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_asi_tursp_reg(fun, fecha);
        });
        $("#tursp").on("change", function () {
            gen_rrhh_asi_tursp_datos($(this).val());
        });
    });
}
function gen_rrhh_asi_tursp_datos(tursp) {
    if (tursp != "") {
        $.get("apps/rrhh/asistencias/tursp/tursp.datos.php", { tursp: tursp }, function (j) {
            $("#hini").val(j.hini);
            $("#hfin").val(j.hfin);
            $("#dhini").val(j.dhini);
            $("#dhfin").val(j.dhfin);
            $("#motivo").val(j.obs);
            $("#jornada").val(j.jornada);
            $("#tjornada").val("sp");
            $("#tmov").val("he");
            $("#htotal").val(j.htotal);
            $("#hdescanso").val(j.hdescanso);
            $("#htrab").val(j.htrabajo);
            $("#hexc").val(j.hexc);
            $("#htn").val(j.htn);
            $("#hed").val(j.hed);
            $("#hen").val(j.hen);
            $("#hedl").val(0);
            $("#hefd").val(j.hefd);
            $("#hefn").val(j.hefn);
        });
    } else {
        $("#hini").val("");
        $("#hfin").val("");
        $("#dhini").val("");
        $("#dhfin").val("");
        $("#motivo").val("");
        $("#jornada").val("");
        $("#tjornada").val("");
        $("#tmov").val("");
        $("#htotal").val("");
        $("#hdescanso").val("");
        $("#htrab").val("");
        $("#hexc").val("");
        $("#htn").val("");
        $("#hed").val("");
        $("#hen").val("");
        $("#hedl").val("");
        $("#hefd").val("");
        $("#hefn").val("");
    }
}
function gen_rrhh_asi_tursp_reg(fun, fecha) {
    var tursp = $("#tursp").val();
    var obs = $("#motivo").val();
    $.get("apps/rrhh/asistencias/tursp/tursp.reg.php", { fun: fun, fecha: fecha, tursp: tursp, obs: obs }, function (j) {
        $("#big-popup-content").html("");
        $("#big-popup").modal("hide");
        gen_rrhh_asi_lista();
    });
}
function gen_rrhh_vacaciones() {
    loading("");
    $.get("apps/rrhh/vacaciones/vacaciones.php", {}, function (res) {
        $("#contenido").html(res);
        $("#tabla-vac").dataTable({ ordering: false, paging: false, scrollX: true });
        loadingClose();
    });
}
function gen_rrhh_vacaciones_programadas() {
    loading("");
    $.get("apps/rrhh/vacaciones/vacaciones.programadas.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function gen_rrhh_vacaciones_programadas_datos() {
    var ano = $("#ano").val();
    loading("");
    $.get("apps/rrhh/vacaciones/vacaciones.programadas.datos.php", { ano: ano }, function (res) {
        $("#vacprog-datos").html(res);
        loadingClose();
    });
}
function gen_rrhh_vac_form(fun, per) {
    loading("");
    $("#popup").modal("show");
    $("#popup-content").html("");
    $.get("apps/rrhh/vacaciones/vac.form.php", { fun: fun, per: per }, function (res) {
        $("#popup-content").html(res);
        $("#vac-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_vac_reg(fun, per);
        });
        $("#fini")
            .datepicker({ language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                gen_rrhh_vac_calc(fun, per);
            });
        $("#vac-form button[type='submit']").hide();
        loadingClose();
    });
}
function gen_rrhh_vac_calc(fun, per) {
    var fini = $("#fini").val();
    var dvac = $("#diasvac").val();
    $("#ant").val("Calculando...");
    $("#diasvac").val("Calculando...");
    $("#feriados").val("Calculando...");
    $("#domingos").val("Calculando...");
    $("#ffin").val("Calculando...");
    $.get("apps/rrhh/vacaciones/vac.calc.php", { fun: fun, per: per, fini: fini, dvac: dvac }, function (j) {
        $("#ant").val(j.antiguedad);
        $("#diasvac").val(j.diasvac);
        $("#feriados").val(j.feriados);
        $("#domingos").val(j.domingos);
        $("#ffin").val(j.ffin);
        $("#vac-form button[type='submit']").show();
    });
}
function gen_rrhh_vac_reg(fun, per) {
    var fini = $("#fini").val();
    var dvac = $("#diasvac").val();
    var ant = $("#ant").val();
    var feriados = $("#feriados").val();
    var domingos = $("#domingos").val();
    var ffin = $("#ffin").val();
    $.get("apps/rrhh/vacaciones/vac.reg.php", { fun: fun, per: per, fini: fini, dvac: dvac, ant: ant, feriados: feriados, domingos: domingos, ffin: ffin }, function () {
        gen_rrhh_vacaciones();
        $("#popup-content").html("");
        $("#popup").modal("hide");
    });
}
function gen_rrhh_vac_exe(fun, per) {
    Swal.fire({
        title: "Ejecución de Vacación",
        text: "Registrar la ejecución de las vacaciones?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Registrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gen_rrhh_vac_exe_reg(fun, per);
        }
    });
}
function gen_rrhh_vac_exe_reg(fun, per) {
    loading("");
    $.get("apps/rrhh/vacaciones/vac.exe.php", { fun: fun, per: per }, function () {
        loadingClose();
        gen_rrhh_vacaciones();
    });
}
function gen_rrhh_info_registros(mes, ano) {
    loading("Cargando lista de registros...");
    $.get("apps/rrhh/info/info.registros.php", { mes: mes, ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_info_registros($("#mes").val(), $("#ano").val());
        });
        $("#tabla-registros").dataTable({});
        loadingClose();
    });
}
function gen_rrhh_info_registros_export(mes, ano) {
    loading("Cargando lista de registros...");
    $.get("apps/rrhh/info/info.registros.export.php", { mes: mes, ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            gen_rrhh_info_registros($("#mes").val(), $("#ano").val());
        });
        var filename = "Registros de Horas Extras - " + ano + "-" + dos_dig(mes);
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        dato = data;
                        return dato;
                    },
                },
            },
        };
        $("#tabla-registros").dataTable({ dom: "Bfrtip", buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", text: "exportar a Excel", title: filename, className: "btn btn-outline-primary btn-xs" })] });
        loadingClose();
    });
}
function gen_rrhh_info_registros_anula(asi) {
    Swal.fire({
        title: "Anular Registro",
        text: "Seguro que quiere anular el registro de hora extra?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Anular",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gen_rrhh_info_registros_anular_reg(asi);
        }
    });
}
function gen_rrhh_info_registros_anular_reg(asi) {
    loading("Anulando registro...");
    $.get("apps/rrhh/info/info.registros.anular.php", { asi: asi }, function (j) {
        if (j.anulado == 1) {
            $("#btn-anula-" + asi).hide();
            $("#btn-anula-cancelar-" + asi).show();
            $("#st-" + asi).html('<i class="fa fa-times text-red"></i> Anulado');
        }
        loadingClose();
    });
}
function gen_rrhh_info_registros_anula_cancelar(asi) {
    Swal.fire({
        title: "Cancelar Registro Anulado",
        text: "Seguro que quiere cancelar anulado de Registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Anular",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gen_rrhh_info_registros_anular_cancelar_reg(asi);
        }
    });
}
function gen_rrhh_info_registros_anular_cancelar_reg(asi) {
    loading("Anulando registro...");
    $.get("apps/rrhh/info/info.registros.anular.cancelar.php", { asi: asi }, function (j) {
        if (j.anulado == 1) {
            $("#btn-anula-" + asi).hide();
            $("#st-" + asi).html('<i class="fa fa-times text-red"></i> Anulado');
        } else if (j.anulado == 0) {
            $("#btn-anula-" + asi).show();
            $("#btn-anula-cancelar-" + asi).hide();
            if (j.aprobar == 0) {
                $("#st-" + asi).html('<i class="fa fa-check text-green"></i> Pendiente Cierre');
            } else {
                if (j.aprobado == 0) {
                    $("#st-" + asi).html('<i class="fa fa-exclamation-triangle text-orange"></i> Falta Aprobar');
                } else {
                    $("#st-" + asi).html('<i class="fa fa-check text-green"></i> Pendiente Cierre');
                }
            }
        }
        loadingClose();
    });
}
function gen_rrhh_asi_aprobar() {
    loading("Cargando lista de registros...");
    $.get("apps/rrhh/aprobar/aprobar.php", {}, function (res) {
        $("#contenido").html(res);
        $("#tabla-aprobar").dataTable();
        loadingClose();
    });
}
function gen_rrhh_asi_aprobar_detalle(asi) {
    loading("");
    $("#big-popup-content").html("");
    $("#big-popup").modal("show");
    $.get("apps/rrhh/aprobar/aprobar.detalle.php", { asi: asi }, function (res) {
        $("#big-popup-content").html(res);
        loadingClose();
    });
}
function gen_rrhh_asi_aprobar_anular(asi) {
    Swal.fire({
        title: "Anula Registro",
        text: "Seguro que quiere anular el registro de hora extra?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Anular",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            gen_rrhh_asi_aprobar_anular_reg(asi);
        }
    });
}
function gen_rrhh_asi_aprobar_anular_reg(asi) {
    loading("Anulando registro...");
    $.get("apps/rrhh/aprobar/aprobar.anular.reg.php", { asi: asi }, function (j) {
        $("#big-popup-content").html("");
        $("#big-popup").modal("hide");
        if (j.anulado == 1) {
            $("#st-" + asi).html('<i class="fa fa-times fa-lg text-red"></i>');
        } else {
            $("#st-" + asi).html("-- ERROR --");
        }
        loadingClose();
    });
}
function gen_rrhh_asi_aprobar_reg(asi) {
    loading("");
    $.get("apps/rrhh/aprobar/aprobar.reg.php", { asi: asi }, function (j) {
        $("#big-popup-content").html("");
        $("#big-popup").modal("hide");
        if (j.aprobado == 1) {
            $("#st-" + asi).html('<i class="fa fa-check fa-lg text-green"></i>');
        } else {
            $("#st-" + asi).html("-- ERROR --");
        }
        loadingClose();
    });
}
function rh2_asistencias(f) {
    loading("Cargando lista...");
    $.post("apps/rrhh-dev/asistencias/asi.php", { f: f }, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function dash_ini() {
    loading("Consultando la Base de Datos...");
    var d = $("#udepartamento").val();
    if (d == 2) {
        $.get("apps/dash/ini/dash.ini.php", {}, function (res) {
            $("#contenido").html(res);
            $("#calendario").fullCalendar({
                eventSources: [
                    { url: "apps/dash/ini/dash.ini.calendar.mudanzas.php", color: "blue", textColor: "white", allDayDefault: true },
                    { url: "apps/dash/ini/dash.ini.progvac.php", color: "red", textColor: "white", allDayDefault: true },
                    { url: "apps/dash/ini/dash.ini.calendar.formbal.php", color: "green", textColor: "white", allDayDefault: true },
                    { url: "apps/dash/ini/dash.ini.calendar.muestrasangre.php", color: "red", textColor: "white", allDayDefault: true },
                    { url: "apps/dash/ini/dash.ini.calendar.tratamiento.php", textColor: "white", allDayDefault: true },
                    { url: "apps/dash/ini/dash.ini.calendar.pollitas.php", textColor: "white", allDayDefault: true },
                ],
                eventClick: function (event, element) {},
            });
            $(".inlinesparkline").sparkline();
            $('[data-toggle="tooltip"]').tooltip();
            loadingClose();
        });
    } else if (d == 1) {
        $.get("apps/dash/gp/gp.ini.php", {}, function (res) {
            $("#contenido").html(res);
            loadingClose();
        });
    } else {
    }
}
function dash_ini_datolotes(avi, lote) {
    $("#popup").modal("show");
    loading("Consultando la Base de Datos...");
    $.post("apps/dash/ini/datolotes.php", { avi: avi, lote: lote }, function (res) {
        $("#popup .modal-content").css({ width: "1000px", "margin-left": "-200px" });
        $("#popup-content").html(res);
        $('[data-toggle="tooltip"]').tooltip();
        loadingClose();
    });
}
function dash_ini_necroavi(avi) {
    $("#popup").modal("show");
    $.post("apps/dash/ini/dash.ini.necroavi.php", { avi: avi }, function (res) {
        $("#popup .modal-content").css({ width: "1200px", "margin-left": "-400px" });
        $("#popup-content").html(res);
        dash_ini_necroavi_datos(avi);
    });
}
function dash_ini_necroavi_datos(avi) {
    loading("Consultando la Base de Datos...");
    $.post("apps/dash/ini/dash.ini.necroavi.datos.php", { avi: avi }, function (res) {
        $("#necdet").html(res);
        loadingClose();
    });
}
function dash_ini_necroavi_photobox(nec) {
    loading("Consultando la Base de Datos...");
    $.post("apps/dash/ini/dash.ini.necroavi.photos.frame.php", { nec: nec }, function (res) {
        $("#photobox").html(res);
        $("#tabla-necdet tbody tr").removeClass("text-bold");
        $("#necdet-" + nec).addClass("text-bold");
        dash_ini_necroavi_photos(nec, 1);
        loadingClose();
    });
}
function dash_ini_necroavi_photos(nec, ave) {
    loading("Consultando la Base de Datos...");
    $.post("apps/dash/ini/dash.ini.necroavi.photos.php", { nec: nec, ave: ave }, function (res) {
        $("#carbox").html(res);
        $("#ave-btn-a button").removeClass("active");
        $("#ave-btn-b button").removeClass("active");
        $("#btn-a-" + ave).addClass("active");
        $("#btn-b-" + ave).addClass("active");
        $("#photos").carousel();
        loadingClose();
    });
}
function dash_ini_necropsias() {
    $("#popup").modal("show");
    $.post("apps/dash/ini/dash.ini.necropsias.php", {}, function (res) {
        $("#popup .modal-content").css({ width: "1200px", "margin-left": "-400px" });
        $("#popup-content").html(res);
        dash_ini_necropsias_datos();
    });
}
function dash_ini_necropsias_datos() {
    loading("Consultando la Base de Datos...");
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    $.post("apps/dash/ini/dash.ini.necropsias.datos.php", { mes: mes, ano: ano }, function (res) {
        $("#necdet").html(res);
        loadingClose();
    });
}
function dash_ini_necropsias_photobox(nec) {
    loading("Consultando la Base de Datos...");
    $.post("apps/dash/ini/dash.ini.necropsias.photos.frame.php", { nec: nec }, function (res) {
        $("#photobox").html(res);
        $("#tabla-necdet tbody tr").removeClass("text-bold");
        $("#necdet-" + nec).addClass("text-bold");
        dash_ini_necropsias_photos(nec, 1);
        loadingClose();
    });
}
function dash_ini_necropsias_photos(nec, ave) {
    loading("Consultando la Base de Datos...");
    $.post("apps/dash/ini/dash.ini.necropsias.photos.php", { nec: nec, ave: ave }, function (res) {
        $("#carbox").html(res);
        $("#ave-btn-a button").removeClass("active");
        $("#ave-btn-b button").removeClass("active");
        $("#btn-a-" + ave).addClass("active");
        $("#btn-b-" + ave).addClass("active");
        $("#photos").carousel();
        loadingClose();
    });
}
function dash_ini_pesajes(lote) {
    $("#popup").modal("show");
    loading("Consultando la Base de Datos...");
    $.post("apps/dash/ini/dash.ini.pesaje.php", { lote: lote }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
    });
}
function dash() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/dash.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function dash_vim_saldohuevos() {
    $.get("apps/dash/vim/saldohuevos.php", {}, function (res) {
        $("#contenido").html(res);
        var datos = "apps/dash/vim/saldohuevos.datos.2.php";
        var Chart1 = new FusionCharts({ type: "zoomlinedy", renderAt: "sh-chart", width: "100%", height: "600", dataFormat: "jsonurl", dataSource: datos });
        Chart1.render();
    });
}
function dash_ppr() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/ppr.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function dash_ppr_prod_global() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/prod.global/prod.global.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_prod_global_datos();
        });
        $("#mes").on("change", function () {
            $("#datos").html("");
        });
        $("#ano").on("change", function () {
            $("#datos").html("");
        });
        loadingClose();
    });
}
function dash_ppr_sync_cch() {
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    loading("Sincronizando datos. Aguarde un momento...");
    $.get("apps/dash/ppr/prod.global/cch.sync.php", { mes: mes, ano: ano }, function () {
        loadingClose();
        dash_ppr_prod_global_datos();
    });
}
function dash_ppr_sync_ppr() {
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    loading("Sincronizando datos. Aguarde un momento...");
    $.get("apps/dash/ppr/prod.global/ppr.sync.php", { mes: mes, ano: ano }, function () {
        loadingClose();
        dash_ppr_prod_global_datos();
    });
}
function dash_ppr_balkg_version_compare() {
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    loading("Sincronizando datos. Aguarde un momento...");
    $.get("apps/dash/ppr/prod.global/version.compare.php", { mes: mes, ano: ano }, function (res) {
        loadingClose();
        $("#datos").html(res);
    });
}
function dash_ppr_prod_global_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    loading("Consultando la Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/prod.global/prod.global.datos.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_prodest() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/prodest/prodest.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_prodest_datos();
        });
        $("#fecha")
            .datepicker({ format: "dd/mm/yyyy", language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        loadingClose();
    });
}
function dash_ppr_prodest_datos() {
    var fecha = $("#fecha").val();
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/prodest/prodest.datos.php", { fecha: fecha }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_necro() {
    $.get("apps/dash/ppr/necropsias/necro.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_necro_datos();
        });
        $("#fini")
            .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function dash_ppr_necro_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    loading("");
    $.get("apps/dash/ppr/necropsias/necro.datos.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_necro_detalles(avi) {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $("#popup").modal("show");
    $("#popup-content").html("");
    $.get("apps/dash/ppr/necropsias/necro.detalles.php", { avi: avi, fini: fini, ffin: ffin }, function (res) {
        $("#popup-content").html(res);
    });
}
function dash_ppr_necro_detalle_necrosco(nec) {
    $("#necro-detalle").html("cargando...");
    $("#necro-fotos").html("");
    $("tr[name=necro-list]").removeClass("bg-lblue");
    $.get("apps/dash/ppr/necropsias/necro.detalles.necrosco.php", { nec: nec }, function (res) {
        $("#necro-detalle").html(res);
        $("#necro-" + nec).addClass("bg-lblue");
    });
}
function dash_ppr_necro_detalle_necrofotos(nec, ave) {
    $("#necro-fotos").html("cargando...");
    $("tr[name=necrosco]").removeClass("bg-lblue");
    $.get("apps/dash/ppr/necropsias/necro.detalles.necrofotos.php", { nec: nec, ave: ave }, function (res) {
        $("#necro-fotos").html(res);
        $("#necrosco-" + ave).addClass("bg-lblue");
    });
}
function dash_ppr_necro_chart() {
    $.get("apps/dash/ppr/necropsias/necro.chart.frame.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_necro_chart_datos("A");
            dash_ppr_necro_chart_datos("B");
        });
    });
}
function dash_ppr_necro_chart_datos(bloque) {
    var ano = $("#ano").val();
    var datos = "apps/dash/ppr/necropsias/necro.chart.datos.php?ano=" + ano + "&bloque=" + bloque;
    var Chart1 = new FusionCharts({ type: "mscolumn2d", renderAt: "chart-" + bloque, width: "100%", height: "350", dataFormat: "jsonurl", dataSource: datos });
    Chart1.render();
}
function dash_ppr_mortandad(ano, mes) {
    $.ajax({
        url: "apps/dash/ppr/prod.mort/mortandad.dia.aviarios.ini.php?ano=" + ano + "&mes=" + mes,
        dataType: "xml",
        success: function (xml) {
            var xano = $(xml).find("ano").text();
            var xmes = $(xml).find("mes").text();
            var pano = $(xml).find("pano").text();
            var pmes = $(xml).find("pmes").text();
            var aano = $(xml).find("aano").text();
            var ames = $(xml).find("ames").text();
            var r = "";
            r += '<div class="box box-default">';
            r += '<div class="box-header">';
            r += '<h3 class="text-center text-blue">MORTANDAD DIARIO DEL MES - POR AVIARIO</h3>';
            r +=
                '<p class="text-center"><button class="btn btn-info btn-sm" onclick="dash_ppr_mortandad(\'' +
                aano +
                "','" +
                ames +
                "');\">&lt;&lt;</button> " +
                xano +
                " / " +
                xmes +
                ' <button class="btn btn-info btn-sm" onclick="dash_ppr_mortandad(\'' +
                pano +
                "','" +
                pmes +
                "');\">&gt;&gt;</button></p>";
            r += "</div>";
            r += '<div class="box-body" id="datos">';
            r += "</div>";
            r += "</div>";
            r += '<div class="modal" tabindex="-1" role="dialog" id="mordet">';
            r += '<div class="modal-dialog" role="document" id="mordet-modal-dialog" style="width:1000px;">';
            r += '<div class="modal-content">';
            r += '<div class="modal-content">';
            r += '<div class="modal-header">';
            r += '<h4 class="modal-title">Perfil de Mortandad</h4>';
            r += '<button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">';
            r += '<span aria-hidden="true">&times;</span>';
            r += "</button>";
            r += "</div>";
            r += '<div class="modal-body" align="center" id="mordet-content">';
            r += "</div>";
            r += '<div class="modal-footer">';
            r += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>';
            r += "</div>";
            r += "</div>";
            r += "</div>";
            r += "</div>";
            r += "</div>";
            $("#contenido").html(r);
            $(xml)
                .find("aviario")
                .each(function () {
                    var b = "";
                    var aviid = $(this).find("avi_id").text();
                    var lotes = $(this).find("lotes").text();
                    var fnacs = $(this).find("fnacs").text();
                    var edads = $(this).find("edads").text();
                    var grupo = $(this).find("avi_grupo").text();
                    var vent = $(this).find("ventiladores").text();
                    var clase_grupo = "";
                    if (grupo == "3") {
                        clase_grupo = "aviario_bloque_a";
                    } else {
                        clase_grupo = "aviario_bloque_b";
                    }
                    b += '<div class="row">';
                    b += '<div class="col-sm-12 col-md-12 col-lg-12 ' + clase_grupo + '" style="padding:10px 15px 10px 15px;margin-bottom:10px;">';
                    b += '<div class="col-sm-6 col-md-6 col-lg-6">';
                    b += '<h4 class="text-blue">' + aviid + "</h4>";
                    b +=
                        '<p>Lote(s): <span class="text-blue">' +
                        lotes +
                        '</span> | F.nac.: <span class="text-blue">' +
                        fnacs +
                        '</span> | Edad(sem.): <span class="text-blue">' +
                        edads +
                        '</span> | Cant. Vent. de techo: <span class="text-blue">' +
                        vent +
                        "</span> ";
                    b += "</div>";
                    b += '<div id="grafico-' + aviid + '" class="col-sm-12 col-md-12 col-lg-12">';
                    b += "</div>";
                    b += "</div>";
                    b += "</div>";
                    b += '<div class="clearfix"></div>';
                    $("#datos").append(b);
                    dash_ppr_mortandad_render(aviid, xano, xmes);
                });
        },
    });
}
function dash_ppr_mortandad_render(aviid, ano, mes) {
    var ancho = $("#grafico-" + aviid).width() - 10;
    var ancho_grafico = ancho * 1;
    var strURL = "apps/dash/ppr/prod.mort/mortandad.dia.aviarios.xml.php?aviario=" + aviid + "&mes=" + mes + "&ano=" + ano;
    
    var chart1 = new FusionCharts({ type: "mscombidy2d", renderAt: "grafico-" + aviid, width: ancho_grafico, height: "500", dataFormat: "xmlurl", dataSource: strURL });
    chart1.render();
}
function dash_ppr_mortandad_detalle(ano, mes, aviid) {
    function toP(n) {
        return (n * 100).toFixed() + "%";
    }
    $("#mordet").modal("show");
    loading("Consultado base de datos...");
    $.get("apps/dash/ppr/prod.mort/mortandad.perfil.php", { ano: ano, mes: mes, avi: aviid }, function (res) {
        $("#mordet-content").html(res);
        var ww = $(window).width();
        var w0 = (ww / 2).toFixed();
        var w1 = $("#mordet-modal-dialog").width();
        var w2 = (w1 / 2).toFixed();
        var wf = w0 - w2;
        $("#mordet-modal-dialog").css({ "margin-left": wf + "px" });
        $("#fini")
            .inputmask({
                alias: "date",
                inputFormat: "dd/mm/yyyy",
                placeholder: "dd/mm/aaaa",
                oncomplete: function () {
                    dash_ppr_mortandad_perfil_ampliado(aviid);
                },
            })
            .on("click", function () {
                $(this).val("");
            });
        $("#ffin")
            .inputmask({
                alias: "date",
                inputFormat: "dd/mm/yyyy",
                placeholder: "dd/mm/aaaa",
                oncomplete: function () {
                    dash_ppr_mortandad_perfil_ampliado(aviid);
                },
            })
            .on("click", function () {
                $(this).val("");
            });
        loadingClose();
    });
}
function dash_ppr_mortandad_perfil_ampliado(aviid) {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    loading("Consultando base de datos...");
    $.get("apps/dash/ppr/prod.mort/mortandad.perfil.ampliado.php", { aviid: aviid, fini: fini, ffin: ffin }, function (res) {
        $("#permor-datos").html(res);
        loadingClose();
    });
}
function dash_ppr_mortipos() {
    loading("");
    $.get("apps/dash/ppr/mortipos/mortipos.php", function (res) {
        $("#contenido").html(res);
        $("#mortipos-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_mortipos_datos();
        });
        loadingClose();
    });
}
function dash_ppr_mortipos_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    loading("");
    $.get("apps/dash/ppr/mortipos/mortipos.datos.php", { mes: mes, ano: ano }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_resavi() {
    $.get("apps/dash/ppr/resavi/resavi.php", function (res) {
        $("#contenido").html(res);
        $("#fini")
            .datepicker({ format: "yyyy-mm-dd", language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ format: "yyyy-mm-dd", language: "es" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_resavi_lote();
            dash_ppr_resavi_moravi_heatmap();
            dash_ppr_resavi_moravi_grafico();
            dash_ppr_resavi_balave_grafico();
            dash_ppr_resavi_henday_grafico();
            dash_ppr_resavi_anah_yema_grafico();
            dash_ppr_resavi_anah_uh_grafico();
            dash_ppr_resavi_anah_resiscas_grafico();
            dash_ppr_resavi_cch_grafico();
            dash_ppr_resavi_necropsias();
            dash_ppr_resavi_logope();
        });
    });
}
function dash_ppr_resavi_moravi_heatmap() {
    $("#heatmap").html('<p class="text-center blink text-green"><i class="fa fa-clock-o"></i> cargando datos...</p>');
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.moravi.heatmap.php", { avi: avi, fini: fini, ffin: ffin }, function (res) {
        $("#heatmap").html(res);
    });
}
function dash_ppr_resavi_moravi_grafico() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.moravi.grafico.php", { avi: avi, fini: fini, ffin: ffin }, function (json) {
        var w = $("#morchart").width() * 0.95;
        var fusioncharts = new FusionCharts({ type: "mscombidy2d", renderAt: "morchart", width: w, height: "350", dataFormat: "json", dataSource: json });
        fusioncharts.render();
    });
}
function dash_ppr_resavi_balave_grafico() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.balave.grafico.php", { avi: avi, fini: fini, ffin: ffin }, function (json) {
        var w = $("#balavechart").width() * 0.95;
        var fusioncharts = new FusionCharts({ type: "msline", renderAt: "balavechart", width: w, height: "350", dataFormat: "json", dataSource: json });
        fusioncharts.render();
    });
}
function dash_ppr_resavi_henday_grafico() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.henday.grafico.php", { avi: avi, fini: fini, ffin: ffin }, function (json) {
        var w = $("#hendaychart").width() * 0.95;
        var fusioncharts = new FusionCharts({ type: "msline", renderAt: "hendaychart", width: w, height: "350", dataFormat: "json", dataSource: json });
        fusioncharts.render();
    });
}
function dash_ppr_resavi_anah_yema_grafico() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.anah.yema.php", { avi: avi, fini: fini, ffin: ffin }, function (json) {
        var w = $("#anahyemachart").width() * 0.95;
        var fusioncharts = new FusionCharts({ type: "msline", renderAt: "anahyemachart", width: w, height: "350", dataFormat: "json", dataSource: json });
        fusioncharts.render();
    });
}
function dash_ppr_resavi_anah_uh_grafico() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.anah.uh.php", { avi: avi, fini: fini, ffin: ffin }, function (json) {
        var w = $("#anahuhchart").width() * 0.95;
        var fusioncharts = new FusionCharts({ type: "msline", renderAt: "anahuhchart", width: w, height: "350", dataFormat: "json", dataSource: json });
        fusioncharts.render();
    });
}
function dash_ppr_resavi_anah_resiscas_grafico() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.anah.resiscas.php", { avi: avi, fini: fini, ffin: ffin }, function (json) {
        var w = $("#anahresiscaschart").width() * 0.95;
        var fusioncharts = new FusionCharts({ type: "msline", renderAt: "anahresiscaschart", width: w, height: "350", dataFormat: "json", dataSource: json });
        fusioncharts.render();
    });
}
function dash_ppr_resavi_cch_grafico() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.cch.php", { avi: avi, fini: fini, ffin: ffin }, function (json) {
        var w = $("#cchchart").width() * 0.95;
        var fusioncharts = new FusionCharts({ type: "msline", renderAt: "cchchart", width: w, height: "350", dataFormat: "json", dataSource: json });
        fusioncharts.render();
    });
}
function dash_ppr_resavi_lote() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.datolote.php", { avi: avi, fini: fini, ffin: ffin }, function (res) {
        $("#datolote").html(res);
    });
}
function dash_ppr_resavi_necropsias() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $("#necropsias-fotos").html("");
    $.get("apps/dash/ppr/resavi/resavi.necropsias.php", { avi: avi, fini: fini, ffin: ffin }, function (res) {
        $("#necropsias").html(res);
    });
}
function dash_ppr_resavi_necropsias_files_preview(id, ave) {
    $.get("apps/dash/ppr/resavi/resavi.necropsias.files.preview.php", { id: id, ave: ave }, function (res) {
        $("#necropsias-fotos").html(res);
    });
}
function ppr_resavi_logope() {
    var avi = $("#avi").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/resavi/resavi.logope.php", { avi: avi, fini: fini, ffin: ffin }, function (res) {
        $("#logope").html(res);
    });
}
function dash_ppr_aves_vivas() {
    $.get("apps/dash/ppr/aves.vivas/aves.vivas.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_aves_vivas_datos();
        });
    });
}
function dash_ppr_aves_vivas_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    loading("Consultando Base de Datos...");
    $.get("apps/dash/ppr/aves.vivas/aves.vivas.datos.php", { a: a, m: m }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_haikei() {
    $.get("apps/dash/ppr/haikei/haikei.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_haikei_datos();
        });
    });
}
function dash_ppr_haikei_datos() {
    var a = $("#ano").val();
    loading("Consultando Base de Datos...");
    $.get("apps/dash/ppr/haikei/haikei.datos.php", { a: a }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_edadprom_bloques() {
    $.get("apps/dash/ppr/edadprom.bloques/edadprom.bloques.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_edadprom_bloques_datos();
        });
    });
}
function dash_ppr_edadprom_bloques_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    loading("Consultando Base de Datos...");
    $.get("apps/dash/ppr/edadprom.bloques/edadprom.bloques.datos.php", { a: a, m: m }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_mortglo() {
    loading("Consultando Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/mortglo/mortglo.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_mortglo_datos();
        });
        loadingClose();
    });
}
function dash_ppr_mortglo_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    loading("Consultando Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/mortglo/mortglo.datos.php", { a: a, m: m }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_morgedad() {
    loading("Consultando Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/mor.grupo.edad/morg.edad.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_morgedad_datos();
        });
        loadingClose();
    });
}
function dash_ppr_morgedad_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    var g = $("#grupo").val();
    loading("Consultando Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/mor.grupo.edad/morg.edad.datos.php", { a: a, m: m, g: g }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_morlotes() {
    loading("Consultando Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/morlotes/morlotes.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_morlotes_datos();
        });
        loadingClose();
    });
}
function dash_ppr_morlotes_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    var g = $("#grupo").val();
    loading("Consultando Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/morlotes/morlotes.datos.php", { a: a, m: m, g: g }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_mor80s() {
    loading("Consultando Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/mor80s/mor80s.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_mor80s_datos();
        });
        loadingClose();
    });
}
function dash_ppr_mor80s_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    loading("Consultando Base de Datos. Aguarde un momento...");
    $.get("apps/dash/ppr/mor80s/mor80s.datos.php", { a: a, m: m }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_ballote() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/bal.lote/bal.lote.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_ballote_datos();
        });
        loadingClose();
    });
}
function dash_ppr_ballote_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    loader("#datos");
    $.get("apps/dash/ppr/bal.lote/bal.lote.datos.php", { a: a, m: m }, function (res) {
        $("#datos").html(res);
    });
}
function dash_ppr_balbloque() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/bal.bloque/bal.bloque.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_balbloque_datos();
        });
        loadingClose();
    });
}
function dash_ppr_balbloque_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/bal.bloque/bal.bloque.datos.php", { a: a, m: m }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_balbloque_avimes(avi, lote) {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    loading("");
    $("#popup").modal("show");
    $.get("apps/dash/ppr/bal.bloque/bal.avimes.php", { ano: ano, mes: mes, avi: avi, lote: lote }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
    });
}
function dash_ppr_ca() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/ca/ca.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_ca_datos();
        });
        loadingClose();
    });
}
function dash_ppr_ca_datos() {
    var a = $("#ano").val();
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/ca/ca.datos.php", { a: a }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_th() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/th/th.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            dash_ppr_th_datos();
        });
        loadingClose();
    });
}
function dash_ppr_th_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/th/th.datos.php", { a: a, m: m }, function (res) {
        $("#datos").html(res);
        $("#tabla-th").dataTable({ ordering: false, paging: false, dom: "Bfrtip", buttons: [{ extend: "excelHtml5", title: "Registro de Temperatura y Humedad " + m + "-" + a }] });
        loadingClose();
    });
}
function dash_ppr_lotes() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/lotes/lotes.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function dash_ppr_loteslab() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/loteslab/loteslab.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function dash_ppr_pry(ano) {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/pry/pry.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_pry_datos();
        });
        loadingClose();
    });
}
function dash_ppr_pry_datos() {
    var ano = $("#ano").val();
    loading("");
    $.get("apps/dash/ppr/pry/pry.datos.php", { ano: ano }, function (res) {
        $("#datos").html(res);
        loadingClose();
        for (var m = 1; m <= 12; m++) {
            dash_ppr_pry_chartaves(ano, m);
        }
    });
}
function dash_ppr_pry_chartaves(ano, mes) {
    var datos = "apps/dash/ppr/pry/pry.chartaves.php?ano=" + ano + "&mes=" + mes;
    var Chart1 = new FusionCharts({ type: "column2d", renderAt: "chartaves-" + mes, width: "100%", height: 400, dataFormat: "jsonurl", dataSource: datos });
    Chart1.render();
}
function dash_ppr_pry_proddet() {}
function dash_ppr_pry_baldet(ano) {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/pry/baldet/pry.baldet.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            dash_ppr_pry_baldet($(this).val());
        });
        loadingClose();
    });
}
function dash_ppr_pry_edades(ano) {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/pry/edad/pry.edad.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            dash_ppr_pry_edades($(this).val());
        });
        loadingClose();
    });
}
function dash_ppr_tipoh() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/tipoh/tipoh.php", {}, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            dash_ppr_tipoh_datos($(this).val());
        });
        dash_ppr_tipoh_datos($("#ano").val());
        loadingClose();
    });
}
function dash_ppr_tipoh_datos(ano) {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/tipoh/tipoh.datos.php", { ano: ano }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_ppr_clasmor() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/clasmor/clasmor.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_clasmor_datos();
        });
        loadingClose();
    });
}
function dash_ppr_clasmor_datos() {
    loading("Consultando Base de Datos...");
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    $.get("apps/dash/ppr/clasmor/clasmor.datos.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        $('[data-toggle="popover"]').popover();
        loadingClose();
    });
}
function dash_ppr_henday() {
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/henday/henday.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_henday_datos();
        });
        loadingClose();
    });
}
function dash_ppr_henday_datos() {
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    loading("Consultando la Base de Datos...");
    $.get("apps/dash/ppr/henday/henday.datos.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        var filename = "Henday";
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        dato = data;
                        return dato;
                    },
                },
            },
        };
        $("table").dataTable({ scrollX: false, dom: "Bfrtip", ordering: false, paging: false, buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", title: filename })] });
        loadingClose();
    });
}
function dash_ppr_saldoaves() {
    $.get("apps/dash/ppr/control.saldo.aves/control.saldo.aves.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_ppr_saldoaves_datos();
        });
        $("#fini")
            .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ format: "dd/mm/yyyy", language: "es", endDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function dash_ppr_saldoaves_datos() {
    loading("Consultando...");
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/dash/ppr/control.saldo.aves/control.saldo.aves.datos.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function dash_gp() {
    loader("#contenido");
    $.get("apps/dash/gp/gp.php", {}, function (res) {
        $("#contenido").html(res);
    });
}
function dash_gp_antiguedad() {
    loader("#contenido");
    $.get("apps/dash/gp/antig/antig.php", {}, function (res) {
        $("#contenido").html(res);
    });
}
function dash_gp_htrab() {
    $.get("apps/dash/gp/htrab/htrab.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            dash_gp_htrab_datos();
        });
    });
}
function dash_gp_htrab_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    $.get("apps/dash/gp/htrab/htrab.datos.php", { mes: mes, ano: ano }, function (res) {
        $("#datos").html(res);
    });
}
function ppr_pro_info_ini(ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info/ini.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_pro_info_ini($(this).val());
        });
    });
}
function ppr_pro_info_mec_bloques(ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info/mec/mec.bloques.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_pro_info_mec_bloques($(this).val());
        });
    });
}
function ppr_pro_info_mec_bloque_detalle(ano, mes) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info/mec/mec.bloque.detalle.php", { ano: ano, mes: mes }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_pro_info_mec_bloque_detalle($(this).val(), $("#mes").val());
        });
        $("#mes").on("change", function () {
            ppr_pro_info_mec_bloque_detalle($("#ano").val(), $(this).val());
        });
    });
}
function ppr_pro_info_lotes(ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info/lotes/lotes.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_pro_info_lotes($(this).val());
        });
    });
}
function ppr_pro_cal() {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/calc/procal.php", {}, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_pro_cal_form(id) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/calc/procal.form.php", { id: id }, function (res) {
        $("#popup-content").html(res);
        $("#procal-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_cal_reg(id);
        });
        $("#fvige")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function ppr_pro_cal_reg(id) {
    var n = $("#ver").val();
    var v = $("#vige").val();
    var f = $("#fvige").val();
    var o = $("#obs").val();
    loader("#popup-content");
    $.post("apps/proyeccion/ppr/calc/procal.reg.php", { id: id, n: n, v: v, f: f, o: o }, function (j) {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(j.id);
    });
}
function ppr_pro_clone(id) {
    $("#popup").modal("show");
    $("#popup-content").html("");
    $.get("apps/proyeccion/ppr/ver/ver.clone.form.php", { id: id }, function (res) {
        $("#popup-content").html(res);
        $("#verclone-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_clone_exe(id);
        });
    });
}
function ppr_pro_clone_exe(id) {
    loading("");
    var ver = $("#ver").val();
    var obs = $("#obs").val();
    $.get("apps/proyeccion/ppr/ver/ver.clone.exe.php", { id: id, ver: ver, obs: obs }, function (j) {
        $("#popup-content").html("");
        $("#popup").modal("hide");
        loadingClose();
        ppr_pro_cal();
    });
}
function ppr_pro_prm(ver) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/param/param.form.php", { ver: ver }, function (res) {
        $("#popup-content").html(res);
        $("#pro-param-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_prm_reg(ver);
        });
    });
}
function ppr_pro_prm_reg(ver) {
    var raza = $("#raza").val();
    var eprodd = $("#eprodd").val();
    var promor = $("#promor").val();
    var epredd = $("#epredd").val();
    var predias = $("#predias").val();
    var premor = $("#premor").val();
    $.post("apps/proyeccion/ppr/param/param.reg.php", { ver: ver, raza: raza, eprodd: eprodd, promor: promor, epredd: epredd, predias: predias, premor: premor }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal();
    });
}
function ppr_pro_cal_lotes(ver) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.php", { ver: ver }, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_pro_cal_lotes_calendario(ver, ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.calendario.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
        for (var m = 1; m <= 12; m++) {
            ppr_pro_cal_lotes_calendario_datos(ver, m);
        }
    });
}
function ppr_pro_cal_lotes_calendario_datos(ver, mes) {
    var ano = $("#ano").val();
    var f = $("#cal-" + mes).attr("fecha");
    $("#cal-" + mes).fullCalendar({
        header: { left: "", center: "title", right: "" },
        defaultDate: f,
        eventSources: [{ url: "apps/proyeccion/ppr/calc/procal.lotes.calendario.datos.php?ver=" + ver + "&ano=" + ano + "&mes=" + mes, color: "blue", textColor: "white", allDayDefault: true }],
        eventClick: function (event, jsEvent, view) {
            ppr_pro_cal_lotes_calendario_detalle(ver, event.idlote);
        },
    });
}
function ppr_pro_cal_lotes_calendario_detalle(ver, lote) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/procal.lotes.calendario.detalle.php", { ver: ver, lote: lote }, function (res) {});
}
function ppr_pro_lotes_delete(ver, lote) {
    $("#popup").modal("show");
    loader("#popup-content");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.delete.php", { ver: ver, lote: lote }, function (res) {
        $("#popup-content").html(res);
    });
}
function ppr_pro_lotes_delete_exe(ver, lote) {
    loader("#popup-content");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.delete.exe.php", { ver: ver, lote: lote }, function (res) {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(ver);
    });
}
function ppr_pro_cal_lotes_form(ver, lote) {
    $("#popup").modal("show");
    loader("#popup-content");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.form.php", { ver: ver, lote: lote }, function (res) {
        $("#popup-content").html(res);
        $("#lotes-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_lotes_reg(ver);
        });
        $("#fnac")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                ppr_pro_lotes_fcalc();
                $(this).datepicker("hide");
            });
        $("#fnac2")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#fnac").inputmask("99/99/9999", {
            placeholder: "dd/mm/aaaa",
            oncomplete: function () {
                ppr_pro_lotes_fcalc();
            },
        });
        $("#fnac2").inputmask("99/99/9999", { placeholder: "dd/mm/aaaa" });
        $("#eprod").on("change", function () {
            ppr_pro_lotes_fcalc();
        });
        $("#eprede").on("change", function () {
            ppr_pro_lotes_fcalc();
        });
    });
}
function ppr_pro_lotes_fcalc() {
    var fnac = $("#fnac").val();
    var eprede = $("#eprede").val();
    var eprod = $("#eprod").val();
    if (fnac != "") {
        $.post("apps/proyeccion/ppr/calc/procal.lotes.fcalc.php", { fnac: fnac, eprede: eprede, eprod: eprod }, function (j) {
            $("#fnac2").val(j.fnac2);
            $("#fprede").val(j.fprede);
            $("#epredes").val(j.epredes);
            $("#fprod").val(j.fprod);
            $("#eprods").val(j.eprods);
        });
    }
}
function ppr_pro_lotes_reg(ver) {
    var id = $("#id").val();
    var lote = $("#lote").val();
    var raza = $("#raza").val();
    var fnac = $("#fnac").val();
    var fnac2 = $("#fnac2").val();
    var aves = $("#aves").val();
    var avi = $("#avi").val();
    var eprod = $("#eprod").val();
    var epred = $("#eprede").val();
    var obs = $("#obs").val();
    $("#popup").modal("hide");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.reg.php", { ver: ver, id: id, lote: lote, raza: raza, fnac: fnac, fnac2: fnac2, aves: aves, avi: avi, eprod: eprod, epred: epred, obs: obs }, function (j) {
        ppr_pro_cal_lotes(ver);
    });
}
function ppr_pro_cal_calendario(ver) {
    var ano = $("#ano").val();
    $.post("apps/proyeccion/ppr/calc/procal.calendario.php", { ver: ver, ano: ano }, function (res) {});
}
function ppr_pro_lotes_import(ver) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/lotes/import.php", { ver: ver }, function (res) {
        $("#contenido").html(res);
        $("#ver").on("change", function () {
            ppr_pro_lotes_import_disponibles(ver, $(this).val());
            ppr_pro_lotes_import_registrados(ver, $(this).val());
        });
    });
}
function ppr_pro_lotes_import_disponibles(ver, dis) {
    loader("#disponibles");
    $.post("apps/proyeccion/ppr/lotes/import.lotes.php", { ver: ver, dis: dis }, function (res) {
        $("#disponibles").html(res);
    });
}
function ppr_pro_lotes_import_registrados(ver, dis) {
    loader("#registrados");
    $.post("apps/proyeccion/ppr/lotes/import.registrados.php", { ver: ver, dis: dis }, function (res) {
        $("#registrados").html(res);
    });
}
function ppr_pro_lotes_import_exe(ver, dis, lote, tmov) {
    loader("#disponibles");
    loader("#registrados");
    $.post("apps/proyeccion/ppr/lotes/import.reg.php", { ver: ver, dis: dis, lote: lote, tmov: tmov }, function () {
        ppr_pro_lotes_import_disponibles(ver, dis);
        ppr_pro_lotes_import_registrados(ver, dis);
    });
}
function ppr_pro_precal_clone(ori_ver_id, ori_lot_id, des_ver_id, des_lot_id) {
    loader("#contenido");
    $.get("apps/proyeccion/ppr/calc/precalc.clone.php", { ovi: ori_ver_id, oli: ori_lot_id, dvi: des_ver_id, dli: des_lot_id }, function () {
        ppr_pro_cal_lotes(des_ver_id);
    });
}
function ppr_pro_precal(ver, fecha) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/calc/precal.php", { ver: ver, fecha: fecha }, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_pro_precal_form(ver, lote, fecha) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/calc/precal.form.php", { ver: ver, lote: lote, fecha: fecha }, function (res) {
        $("#popup-content").html(res);
        $("#precal-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_precal_reg(ver, lote, fecha);
        });
        $("#fventa")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            })
            .inputmask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    });
}
function ppr_pro_precal_reg(ver, lote, fecha) {
    var fventa = $("#fventa").val();
    var cventa = $("#cventa").val();
    $.post("apps/proyeccion/ppr/calc/precal.reg.php", { ver: ver, lote: lote, fventa: fventa, cventa: cventa }, function () {
        $("#popup").modal("hide");
        ppr_pro_precal(ver, fventa);
    });
}
function ppr_pro_aju(ver, lote) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/calc/procal.ajuste.form.php", { ver: ver, lote: lote }, function (res) {
        $("#popup-content").html(res);
        $("#ajuste-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_aju_reg(ver, lote);
        });
        $("#fecha")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                ppr_pro_aju_fcalc(ver, lote, $(this).val());
            })
            .inputmask("99/99/9999", {
                placeholder: "dd/mm/aaaa",
                oncomplete: function () {
                    ppr_pro_aju_fcalc(ver, lote, $(this).val());
                },
            });
        $("#eprede").on("change", function () {
            ppr_pro_aju_fcalc(ver, lote, $("#fecha").val());
        });
        $("#nsaldo").on("change", function () {
            var saldo = $("#saldo").val();
            var ajuste = $(this).val() - saldo;
            $("#ajuste").val(ajuste);
        });
    });
}
function ppr_pro_aju_fcalc(ver, lote, fecha) {
    var eprede = $("#eprede").val();
    $.post("apps/proyeccion/ppr/calc/procal.ajuste.fcalc.php", { ver: ver, lote: lote, fecha: fecha, eprede: eprede }, function (j) {
        $("#edadd").val(j.edadd);
        $("#edads").val(j.edads);
        $("#epredes").val(j.epreds);
        $("#fprede").val(j.fprede);
        $("#saldo").val(j.saldo);
    });
}
function ppr_pro_aju_reg(ver, lote) {
    var edadd = $("#edadd").val();
    var nsaldo = $("#nsaldo").val();
    var ajuste = $("#ajuste").val();
    var epredd = $("#eprede").val();
    $.post("apps/proyeccion/ppr/calc/procal.ajuste.reg.php", { ver: ver, lote: lote, edadd: edadd, nsaldo: nsaldo, ajuste: ajuste, epredd: epredd }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(ver);
    });
}
function ppr_pro2_info(ver, ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info2/info.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_pro2_info_mes(ver, ano, mes) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info2/info.mes.php", { ver: ver, ano: ano, mes: mes }, function (res) {
        $("#contenido").html(res);
        $("#mes").on("change", function () {
            var nmes = $("#mes").val();
            var nano = $("#ano").val();
            ppr_pro2_info_mes(ver, nano, nmes);
        });
        $("#ano").on("change", function () {
            var nmes = $("#mes").val();
            var nano = $("#ano").val();
            ppr_pro2_info_mes(ver, nano, nmes);
        });
    });
}
function ppr_pro2_info_haikei(ver, ano, mes) {
    $("#popup").modal("show");
    loader("#popup-content");
    $.get("apps/proyeccion/ppr/info2/info.haikei.mes.php", { ver: ver, ano: ano, mes: mes }, function (res) {
        $("#popup-content").html(res);
    });
}
function ppr_pro2_info_grafico(ver, ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info2/info.grafico.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
        ppr_pro2_info_grafico_render(ver, ano);
    });
}
function ppr_pro2_info_grafico_render(ver, ano) {
    var ancho = $("#grafico").width() - 10;
    var ancho_grafico = ancho * 1;
    var strURL = "apps/proyeccion/ppr/info2/info.grafico.datos.php?ver=" + ver + "&ano=" + ano;
    var chart1 = new FusionCharts({ type: "mscombidy2d", renderAt: "grafico", width: ancho_grafico, height: "500", dataFormat: "xmlurl", dataSource: strURL });
    chart1.render();
}
function ppr_pro_calendario(ver, ano) {
    loading("Consultando la Base de Datos");
    $.get("apps/proyeccion/ppr/calendario/calendario.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
        loadingClose();
        for (var m = 1; m <= 12; m++) {
            ppr_pro_calendario_datos(ver, ano, m);
        }
    });
}
function ppr_pro_calendario_datos(ver, ano, mes) {
    loader("#mes-" + mes);
    $.get("apps/proyeccion/ppr/calendario/calendario.mes.php", { ver: ver, ano: ano, mes: mes }, function (res) {
        $("#mes-" + mes).html(res);
    });
}
function rec_pro_prm(ver) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/rec/param/param.form.php", { ver: ver }, function (res) {
        $("#popup-content").html(res);
        $("#rec-param-form").on("submit", function (ev) {
            ev.preventDefault();
            rec_pro_prm_reg(ver);
        });
    });
}
function rec_pro_prm_reg(ver) {
    var bonif = $("#bonif").val();
    var merma = $("#merma").val();
    $.post("apps/proyeccion/rec/param/param.reg.php", { ver: ver, bonif: bonif, merma: merma }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal();
    });
}
function rec_pry_lote_form(ver, plote) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/rec/lotes/rec.lote.form.php", { ver: ver, plote: plote }, function (res) {
        $("#popup-content").html(res);
        $("#rlote-form").on("submit", function (ev) {
            ev.preventDefault();
            rec_pry_lote_reg(ver, plote);
        });
        $("#grupo").on("change", function () {
            rec_pry_lote_form_datos(ver, plote);
        });
        $("#merma").on("change", function () {
            rec_pry_lote_form_datos(ver, plote);
        });
        $("#bonif").on("change", function () {
            rec_pry_lote_form_datos(ver, plote);
        });
    });
}
function rec_pry_lote_delman(ver, plote) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/rec/lotes/rec.lote.delman.php", { ver: ver, plote: plote }, function (res) {
        $("#popup-content").html(res);
        $("#rlote-form").on("submit", function (ev) {
            ev.preventDefault();
            rec_pry_lote_delman_exe(ver, plote);
        });
        $("#grupo").on("change", function () {
            rec_pry_lote_delman_datolote(ver, plote, $(this).val());
        });
    });
}
function rec_pry_lote_delman_datolote(ver, plote, grupo) {
    $.post("apps/proyeccion/rec/lotes/rec.lote.delman.datolote.php", { ver: ver, plote: plote, grupo: grupo }, function (j) {
        $("#fnac").val(j.fnac);
        $("#rlote").val(j.rlote);
    });
}
function rec_pry_lote_delman_exe(ver, plote) {
    var grupo = $("#grupo").val();
    $.post("apps/proyeccion/rec/lotes/rec.lote.delman.exe.php", { ver: ver, plote: plote, grupo: grupo }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(ver);
    });
}
function rec_pry_lote_form_datos(ver, plote) {
    var grupo = $("#grupo").val();
    var merma = $("#merma").val();
    var bonif = $("#bonif").val();
    $.post("apps/proyeccion/rec/lotes/rec.lote.form.datos.php", { ver: ver, plote: plote, grupo: grupo, merma: merma, bonif: bonif }, function (j) {
        $("#rlote").val(j.rlote);
        $("#fnac").val(j.fnac);
        $("#aves").val(j.avesini);
        $("#eprodd").val(j.eprodd);
        $("#eprods").val(j.eprods);
        $("#fprod").val(j.fprod);
    });
}
function rec_pry_lote_reg(ver, plote) {
    var grupo = $("#grupo").val();
    var rlote = $("#rlote").val();
    var bonif = $("#bonif").val();
    var merma = $("#merma").val();
    var manejo = $("#manejo").val();
    var obs = $("#obs").val();
    $.post("apps/proyeccion/rec/lotes/rec.lote.reg.php", { ver: ver, plote: plote, grupo: grupo, rlote: rlote, bonif: bonif, merma: merma, manejo: manejo, obs: obs }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(ver);
    });
}
function rec_pry_lotes(ver) {
    loader("#contenido");
    $.post("apps/proyeccion/rec/lotes/rec.lotes.php", { ver: ver }, function (res) {
        $("#contenido").html(res);
    });
}
function rec_pry_lotes_calendario(ver, ano) {
    loader("#contenido");
    $.post("apps/proyeccion/rec/lotes/rec.lote.calendario.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
        for (var m = 1; m <= 12; m++) {
            rec_pry_lotes_calendario_datos(ver, m);
        }
    });
}
function rec_pry_lotes_calendario_datos(ver, mes) {
    var ano = $("#ano").val();
    var f = $("#cal-" + mes).attr("fecha");
    $("#cal-" + mes).fullCalendar({
        header: { left: "", center: "title", right: "" },
        defaultDate: f,
        eventSources: [{ url: "apps/proyeccion/rec/lotes/rec.lote.calendario.datos.php?ver=" + ver + "&ano=" + ano + "&mes=" + mes, color: "blue", textColor: "white", allDayDefault: true }],
        eventClick: function (event, jsEvent, view) {},
    });
}
function pcom() {
    loader("#contenido");
    $.get("apps/pcom/pcom.php", {}, function (res) {
        $("#contenido").html(res);
        $("#tabla-pcom").dataTable();
    });
}
function pcom_form(id) {
    $("#popup").modal("show");
    $.get("apps/pcom/pcom.form.php", { id: id }, function (res) {
        $("#popup-content").html(res);
        $("#pcom-form").on("submit", function (e) {
            e.preventDefault();
        });
        $("#fecha").inputmask({ alias: "date", inputFormat: "dd/mm/yyyy", placeholder: "dd/mm/aaaa" });
    });
}
function passwd_form() {
    $("#passwd-chg-box").modal("show");
    $.get("apps/sys/passwd/passwd.php", {}, function (res) {
        $("#passwd-box").html(res);
        $("#passwd-form").on("submit", function (ev) {
            ev.preventDefault();
            passwd_reg();
        });
    });
}
function passwd_reg() {
    var pass0 = $("#pass0").val();
    var pass1 = $("#pass1").val();
    var pass2 = $("#pass2").val();
    loading("");
    $.post("apps/sys/passwd/passwd.reg.php", { pass0: pass0, pass1: pass1, pass2: pass2 }, function (j) {
        loadingClose();
        $("#passwd-form")[0].reset();
        $("#passwd-chg-box").modal("hide");
        if (j.error == 0) {
            Swal.fire("Cambio Procesado", "Se ha procesado correctamente el cambio de contraseña.", "success");
        } else if (j.error == 1) {
            Swal.fire("!-- ERROR --!", "Ha ocurrido un error durante el cambio de contraseña. Consulte con el Administrador del Sistema.", "warning");
        }
    });
}
function cch_clash() {
    loader("#contenido");
    $.get("apps/cch/clash/clash.php", function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
            cch_clash_datos();
        });
        $("#ano").on("change", function () {
            cch_clash_datos();
        });
        $("#mes").on("change", function () {
            cch_clash_datos();
        });
        $("#bloque").on("change", function () {
            cch_clash_datos();
        });
        $("#desp").on("change", function () {
            cch_clash_datos();
        });
    });
}
function cch_clash_datos() {
    var m = $("#mes").val();
    var a = $("#ano").val();
    var b = $("#bloque").val();
    var d = $("#desp").val();
    if (m != "" && a != "" && b != "") {
        $.post("apps/cch/clash/clash.datos.php", { m: m, a: a, b: b, d: d }, function (res) {
            $("#clash-box").html(res);
            cch_clash_onselect();
        });
    }
}
function cch_clash_onselect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            cch_form_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig") || this.innerHTML == "") {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var fecha = this.getAttribute("fecha");
                var campo = this.getAttribute("campo");
                cch_clash_reg(fecha, campo, valor);
            }
        };
    }
}
function cch_form_selectElement(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
function cch_clash_reg(fecha, campo, valor) {
    var b = $("#bloque").val();
    $.post("apps/cch/clash/clash.reg.php", { f: fecha, c: campo, v: valor, b: b }, function () {});
}
function cch_thuevos() {
    $.get("apps/cch/thuevos/thuevos.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            cch_thuevos_datos();
        });
        $("#ano").on("change", function () {
            $("#datos").html("");
        });
        $("#mes").on("change", function () {
            $("#datos").html("");
        });
    });
}
function cch_thuevos_datos() {
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    loading("");
    $.get("apps/cch/thuevos/thuevos.datos.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function cch_thuevos_diario() {
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    loading("");
    $.get("apps/cch/thuevos/thuevos.diario.php", { ano: ano, mes: mes }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function cch_thuevo_analisis() {
    var ano = $("#ano").val();
    var mes = $("#mes").val();
    loading("");
    $.get("apps/cch/thuevos/thuevos.resumen.php", { ano: ano, mes: mes }, function (res) {
        $("#contenido").html(res);
        $("#thuevo-form").on("submit", function (ev) {
            ev.preventDefault();
            cch_thuevo_analisis();
        });
        $("#ano").on("change", function () {
            cch_thuevo_analisis();
        });
        loadingClose();
        for (var m = 1; m <= 12; m++) {
            cch_thuevo_analisis_chart1(ano, m);
            cch_thuevo_analisis_chart2(ano, m);
            cch_thuevo_analisis_chart3(ano, m);
        }
    });
}
function cch_thuevo_analisis_chart1(ano, mes) {
    var datos = "apps/cch/thuevos/thuevos.chart.php?ano=" + ano + "&mes=" + mes;
    var Chart1 = new FusionCharts({ type: "column2d", renderAt: "chart1-" + mes, width: "100%", height: 400, dataFormat: "jsonurl", dataSource: datos });
    Chart1.render();
}
function cch_thuevo_analisis_chart2(ano, mes) {
    var datos = "apps/cch/thuevos/thuevos.chart2.php?ano=" + ano + "&mes=" + mes;
    var Chart1 = new FusionCharts({ type: "column2d", renderAt: "chart2-" + mes, width: "100%", height: 400, dataFormat: "jsonurl", dataSource: datos });
    Chart1.render();
}
function cch_thuevo_analisis_chart3(ano, mes) {
    var datos = "apps/cch/thuevos/thuevos.chart3.php?ano=" + ano + "&mes=" + mes;
    var Chart1 = new FusionCharts({ type: "column2d", renderAt: "chart3-" + mes, width: "100%", height: 400, dataFormat: "jsonurl", dataSource: datos });
    Chart1.render();
}
function rec_dd(fecha) {
    loading("");
    $.get("apps/rec/dd/dd.php", { fecha: fecha }, function (res) {
        $("#contenido").html(res);
        $("#fecha")
            .datepicker({ language: "es", maxDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                rec_dd($(this).val());
            });
        $(".inlinesparkline").sparkline();
        loadingClose();
    });
}
function rec_dd_form(lote) {
    loading("");
    $.get("apps/rec/dd/dd.form.php", { lote: lote }, function (res) {
        $("#contenido").html(res);
        rec_dd_form_onSelect(lote);
        rec_dd_resem(lote);
        loadingClose();
    });
}
function rec_dd_form_onSelect(lote) {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            celda_editable_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var campo = this.getAttribute("campo");
                var fecha = this.getAttribute("fecha");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                if (campo == "muertos" || campo == "enfermos" || campo == "eliminados") {
                    rec_dd_merma(lote, fecha, campo, valor);
                } else if (campo == "kgbal") {
                    rec_dd_kgbal(lote, fecha, valor);
                } else if (campo == "tin") {
                    rec_dd_tin(lote, fecha, valor);
                } else if (campo == "tou") {
                    rec_dd_tou(lote, fecha, valor);
                }
            }
        };
    }
}
function rec_dd_merma(lote, fecha, campo, valor) {
    $.get("apps/rec/dd/dd.reg.merma.php", { lote: lote, fecha: fecha, tipo: campo, cant: valor }, function (j) {
        $.each(j.datos, function (i, obj) {
            $("#saldo-" + obj.edadd).html(obj.saldo);
            $("#macu-" + obj.edadd).html(obj.macu);
            $("#pmort-" + obj.edadd).html(obj.pmort);
            $("#balave-" + obj.edadd).html(obj.balave);
        });
        rec_dd_resem(lote);
    });
}
function rec_dd_tin(lote, fecha, valor) {
    $.get("apps/rec/dd/dd.reg.transferin.php", { lote: lote, fecha: fecha, cant: valor }, function (j) {
        $.each(j.datos, function (i, obj) {
            $("#saldo-" + obj.edadd).html(obj.saldo);
            $("#macu-" + obj.edadd).html(obj.macu);
            $("#pmort-" + obj.edadd).html(obj.pmort);
            $("#balave-" + obj.edadd).html(obj.balave);
        });
        rec_dd_resem(lote);
    });
}
function rec_dd_tou(lote, fecha, valor) {
    $.get("apps/rec/dd/dd.reg.transferout.php", { lote: lote, fecha: fecha, cant: valor }, function (j) {
        $.each(j.datos, function (i, obj) {
            $("#saldo-" + obj.edadd).html(obj.saldo);
            $("#macu-" + obj.edadd).html(obj.macu);
            $("#pmort-" + obj.edadd).html(obj.pmort);
            $("#balave-" + obj.edadd).html(obj.balave);
        });
        rec_dd_resem(lote);
    });
}
function rec_dd_kgbal(lote, fecha, valor) {
    $.get("apps/rec/dd/dd.reg.kgbal.php", { lote: lote, fecha: fecha, cant: valor }, function (j) {
        $.each(j.datos, function (i, obj) {
            $("#balave-" + obj.edadd).html(obj.balave);
            $("#balacu-" + obj.edadd).html(obj.kgacum);
        });
        rec_dd_resem(lote);
    });
}
function rec_dd_anota_vermas(lote, fecha) {
    $("#popup").modal("show");
    $.get("apps/rec/dd/dd.anota.vermas.php", { lote: lote, fecha: fecha }, function (res) {
        $("#popup-content").html(res);
    });
}
function rec_dd_resem(lote) {
    $.get("apps/rec/dd/dd.resem.php", { lote: lote }, function (j) {
        $.each(j.dds, function (i, obj) {
            $("#sem-transferin-" + obj.edads).html(obj.tin);
            $("#sem-transferout-" + obj.edads).html(obj.tou);
            $("#sem-muertos-" + obj.edads).html(obj.muertos);
            $("#sem-enfermos-" + obj.edads).html(obj.enfermos);
            $("#sem-eliminados-" + obj.edads).html(obj.eliminados);
            $("#sem-saldo-" + obj.edads).html(obj.saldo);
            $("#sem-macu-" + obj.edads).html(obj.acumulados);
            $("#sem-pmort-" + obj.edads).html(obj.pmort);
            $("#sem-kgbal-" + obj.edadd).html(obj.kgbal);
            $("#sem-balave-" + obj.edads).html(obj.balave);
            $("#sem-kgacum-" + obj.edads).html(obj.kgacum);
            $("#sem-pesopad-" + obj.edads).html(obj.pad_peso);
            $("#sem-pesoreal-" + obj.edads).html(obj.peso);
        });
    });
}
function rec_pesaje_ini(lote, origen) {
    loading("");
    $.get("apps/rec/pesajes/pesaje.ini.php", { lote: lote, origen: origen }, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function rec_pesaje(lote) {
    loading("");
    $("#popup").modal("show");
    $.get("apps/rec/pesajes/pesaje.php", { lote: lote }, function (res) {
        $("#popup-content").html(res);
        $("#fpesaje")
            .datepicker({ dateFormat: "dd/mm/yyyy", language: "es", maxDate: "0D" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                rec_pesaje_datos_fecha(lote, $(this).val());
            });
        $("#cuadros").on("change", function () {
            rec_pesaje_datos_fecha(lote, $("#fpesaje").val());
        });
        loadingClose();
    });
}
function rec_pesaje_datos_fecha(lote, fecha) {
    $("#cuadro-pesaje").html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>');
    $.get("apps/rec/pesajes/pesaje.datos.fecha.php", { lote: lote, fecha: fecha }, function (j) {
        if (j.existe === 0) {
            if (j.diasdiff === 0) {
                $("#cuadros").val(j.cuadros);
                $("#aves").val(j.aves);
                $("#edads").val(j.edads);
                $("#edads").attr("disabled", "disabled");
                rec_pesaje_datos_form(lote, fecha);
                $("#cuadros").on("change", function () {
                    rec_pesaje_datos_form(lote, fecha);
                });
                rec_pesaje_datos_calc(lote, fecha);
            } else {
                $("#edads").removeAttr("disabled");
                var r = "";
                r += '<div class="alert alert-warning">';
                r += "<p>Hay diferencia de " + j.diasdiff + " d&iacute;as con la edad especificada. Desea ajustar el peso promedio?.</p>";
                r += '<div class="btn-group">';
                r += '<button class="btn btn-outline-primary btn-sm">Ajustar</button>';
                r += '<button class="btn btn-outline-danger btn-sm">NO Ajustar</button>';
                r += "</div>";
                r += "</div>";
                $("#cuadro-pesaje").html(r);
            }
        } else {
            rec_pesaje_opt(lote, fecha);
        }
    });
}
function rec_pesaje_opt(lote, fecha) {
    $.get("apps/rec/pesajes/pesaje.opt.php", { lote: lote, fecha: fecha }, function (res) {
        $("#cuadro-pesaje").html(res);
    });
}
function rec_pesaje_datos_form(lote, fecha) {
    $("#cuadro-pesaje").html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>');
    var cuadros = $("#cuadros").val();
    $.get("apps/rec/pesajes/pesaje.datos.form.php", { lote: lote, fecha: fecha, cuadros: cuadros }, function (res) {
        $("#cuadro-pesaje").html(res);
        rec_pesaje_datos_form_onSelect(lote, fecha);
    });
}
function rec_pesaje_datos_form_onSelect(lote, fecha) {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            celda_editable_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                var peso = valor.replace(regex, "");
                var ave = this.getAttribute("nroave");
                rec_pesaje_datos_reg(lote, fecha, ave, peso);
            }
        };
    }
}
function rec_pesaje_datos_calc(lote, fecha) {
    $("#aves").html("---");
    $("#ppad").html("---");
    $("#pprom").html("---").removeClass("text-red").removeClass("text-green");
    $("#pmax").html("---");
    $("#pmin").html("---");
    $("#unif").html("---");
    $("#pmas10").html("---");
    $("#pmen10").html("---");
    $.get("apps/rec/pesajes/pesaje.datos.calc.php", { lote: lote, fecha: fecha }, function (j) {
        $("#aves").html(j.aves);
        $("#ppad").html(j.ppad);
        $("#pprom").html(j.pprom).addClass(j.pprom_class);
        $("#pmax").html(j.pmax);
        $("#pmin").html(j.pmin);
        $("#unif").html(j.unif);
        $("#pmas10").html(j.pmas10);
        $("#pmen10").html(j.pmen10);
    });
}
function rec_pesaje_datos_reg(lote, fecha, ave, peso) {
    var cuadros = $("#cuadros").val();
    $.post("apps/rec/pesajes/pesaje.reg.php", { lote: lote, fecha: fecha, ave: ave, peso: peso, cuadros: cuadros }, function (j) {
        rec_pesaje_datos_calc(lote, fecha);
    });
}
function rec_vacreg(lote) {
    loading("");
    $.get("apps/rec/vacunas/vacunas.php", { lote: lote }, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function rec_vacreg_form(lote) {}
function rec_resumen(lote, origen) {
    loading("");
    $.get("apps/rec/resumen/resumen.php", { lote: lote, origen: origen }, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function rec_resumen_unif(lote, eds) {
    $("#popup").modal("show");
    $.get("apps/rec/resumen/resumen.unif.php", { lote: lote, eds: eds }, function (res) {
        $("#popup-content").html(res);
        rec_resumen_unif_chart(lote, eds);
    });
}
function rec_resumen_unif_chart(lote, eds) {
    var ancho = $("#unif-chart").width() - 10;
    var ancho_grafico = ancho * 1;
    var strURL = "apps/rec/resumen/resumen.unif.chart.php?lote=" + lote + "&eds=" + eds;
    var chart1 = new FusionCharts({ type: "column2d", renderAt: "unif-chart", width: ancho_grafico, height: "500", dataFormat: "jsonurl", dataSource: strURL });
    chart1.render();
}
function rec_resumen_peso(lote) {
    $("#popup").modal("show");
    $.get("apps/rec/resumen/resumen.peso.php", { lote: lote }, function (res) {
        $("#popup-content").html(res);
        rec_resumen_peso_chart(lote);
    });
}
function rec_resumen_peso_chart(lote) {
    var ancho = $("#peso-chart").width() - 10;
    var ancho_grafico = ancho * 1;
    var strURL = "apps/rec/resumen/resumen.peso.chart.php?lote=" + lote;
    var chart1 = new FusionCharts({ type: "line", renderAt: "peso-chart", width: ancho_grafico, height: "500", dataFormat: "jsonurl", dataSource: strURL });
    chart1.render();
}
function rec_cfg_lotes(ver) {
    loading("Cargando lista de Lotes...");
    $.post("apps/rec/cfg/lotes/lotes.php", { ver: ver }, function (res) {
        $("#contenido").html(res);
        $("#tabla-lotes").dataTable({ ordering: false });
        $("#ver").on("change", function () {
            rec_cfg_lotes($(this).val());
        });
        loadingClose();
    });
}
function rec_cfg_lote_act(lote, st, ver) {
    loading("Procesando...");
    $.get("apps/rec/cfg/lotes/lotes.act.php", { lote: lote, act: st }, function () {
        loadingClose();
        rec_cfg_lotes(ver);
    });
}
function rec_cfg_razas() {
    loading("Cargando lista de razas...");
    $.get("apps/rec/cfg/razas/razas.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function rec_cfg_padron(raza) {
    loading("Cargando datos de padrón de la raza...");
    $.get("apps/rec/cfg/razas/padron.php", { raza: raza }, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function mante_cat() {
    loading("Cargando...");
    $.get("apps/mante/cat/cat.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function man_wcat_form(cat) {
    $("#popup").modal("show");
    $.get("apps/mante/cat/cat.form.php", { cat: cat }, function (res) {
        $("#popup-content").html(res);
        $("#wcat-form").on("submit", function (e) {
            e.preventDefault();
            man_wcat_reg();
        });
    });
}
function man_wcat_reg() {
    var id = $("#id").val();
    var name = $("#name").val();
    var cor = $("#cor").val();
    var pt = $("#pt").val();
    $.post("apps/mante/cat/cat.reg.php", { id: id, name: name, cor: cor, pt: pt }, function () {
        $("#popup").modal("hide");
        mante_cat();
    });
}
function man_wcat_subcat_form(cat, sub) {
    $("#popup").modal("show");
    $.get("apps/mante/cat/subcat.form.php", { cat: cat, sub: sub }, function (res) {
        $("#popup-content").html(res);
        $("#subcat-form").on("submit", function (e) {
            e.preventDefault();
            man_wcat_subcat_reg(cat, sub);
        });
    });
}
function man_wcat_subcat_reg(cat, sub) {
    var name = $("#name").val();
    alert(cat + " | " + sub + " | " + name);
    $.post("apps/mante/cat/subcat.reg.php", { cat: cat, sub: sub, name: name }, function () {
        $("#popup").modal("hide");
        mante_cat();
    });
}
function man_users() {
    loading("Cargando datos...");
    $.get("apps/mante/users/users.php", {}, function (res) {
        $("#contenido").html(res);
        $("#table-users").dataTable();
        loadingClose();
    });
}
function man_users_form(legajo) {
    loading("Cargando formulario...");
    $("#popup").modal("show");
    $.get("apps/mante/users/users.form.php", { legajo: legajo }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
        $("#users-form").on("submit", function (e) {
            e.preventDefault();
            man_users_reg(legajo);
        });
    });
}
function man_users_reg(legajo) {
    var usuario = $("#usuario").val();
    var pin = $("#pin").val();
    $.post("apps/mante/users/users.reg.php", { legajo: legajo, usuario: usuario, pin: pin }, function () {
        $("#popup").modal("hide");
        man_users();
    });
}
function man_users_pin_form(legajo) {
    $("#popup").modal("show");
    $.post("apps/mante/users/users.pin.php", { legajo: legajo }, function (res) {
        $("#popup-content").html(res);
        $("#pin-form").on("submit", function (e) {
            e.preventDefault();
            man_users_pin_reg(legajo);
        });
    });
}
function man_users_pin_reg(legajo) {
    var pin = $("#pin").val();
    $.post("apps/mante/users/users.pin.reg.php", { legajo: legajo, pin: pin }, function () {
        $("#popup").modal("hide");
        man_users();
    });
}
function man_users_elim(legajo) {
    $.post("apps/mante/users/users.eliminar.php", { legajo: legajo }, function () {
        $("#popup").modal("hide");
        man_users();
    });
}
function man_users_activar(legajo) {
    $.post("apps/mante/users/users.activar.php", { legajo: legajo }, function () {
        $("#popup").modal("hide");
        man_users();
    });
}
function man_info() {
    loading("Cargando datos...");
    $.get("apps/mante/info/info.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function man_info_ratio_tntf() {
    loading("Cargando datos...");
    $.get("apps/mante/info/tntf/tntf.php", {}, function (res) {
        $("#contenido").html(res);
        $("#fini")
            .datetimepicker({ format: "DD/MM/YYYY" })
            .on("dp.change", function (e) {
                $("#ffin").data("DateTimePicker").minDate(e.date);
                man_info_ratio_tntf_datos();
            });
        $("#ffin")
            .datetimepicker({ format: "DD/MM/YYYY" })
            .on("dp.change", function (e) {
                $("#fini").data("DateTimePicker").maxDate(e.date);
                man_info_ratio_tntf_datos();
            });
        loadingClose();
    });
}
function man_info_ratio_tntf_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    loading("Consultando la Base de Datos");
    $.get("apps/mante/info/tntf/tntf.datos.php", { fini: fini, ffin: ffin }, function (j) {
        loadingClose();
        $("#tn").html(j.tn);
        $("#tf").html(j.tf);
        $("#tna").html(j.tna);
        $("#tfa").html(j.tfa);
        $("#tnb").html(j.tnb);
        $("#tfb").html(j.tfb);
    });
}
function man_info_tecnicos() {
    loading("Consultando la Base de Datos");
    $.get("apps/mante/info/tecnicos/tecnicos.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (e) {
            e.preventDefault();
        });
        $("#tec").on("change", function () {
            man_info_tecnicos_datos();
        });
        $("#fini")
            .datetimepicker({ format: "DD/MM/YYYY" })
            .on("dp.change", function (e) {
                $("#ffin").data("DateTimePicker").minDate(e.date);
                man_info_tecnicos_datos();
            });
        $("#ffin")
            .datetimepicker({ format: "DD/MM/YYYY" })
            .on("dp.change", function (e) {
                $("#fini").data("DateTimePicker").maxDate(e.date);
                man_info_tecnicos_datos();
            });
        loadingClose();
    });
}
function man_info_tecnicos_datos() {
    var tec = $("#tec").val();
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    if (tec != "" && fini != "" && ffin != "") {
        loading("Consultando la Base de Datos");
        $.get("apps/mante/info/tecnicos/tecnicos.datos.php", { fini: fini, ffin: ffin, tec: tec }, function (res) {
            $("#tec-datos").html(res);
            $("#tabla-work").dataTable({ dom: "Bfrtip", buttons: [{ extend: "excelHtml5", filename: "Ficha de trabajos Técnicos " + fini + " a " + ffin }] });
            loadingClose();
        });
    } else {
        $("#tec-datos").html("");
    }
}
function man_info_workdet(wid) {
    $("#popup").modal("show");
    loading("Consultando la Base de Datos");
    $.get("apps/mante/info/tecnicos/tecnico.work.detalle.php", { wid: wid }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
    });
}
function man_info_tecnico(tec) {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $("#popup").modal("show");
    loading("Consultando la Base de Datos");
    $.get("apps/mante/info/tecnicos/tecnico.detalle.php", { fini: fini, ffin: ffin, tec: tec }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
    });
}
function man_info_regman() {
    $.get("apps/mante/info/regman/regman.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            man_info_regman_datos();
        });
        $("#fini")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("change", function () {
                $(this).datepicker("hide");
            });
        $("#ffin")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("change", function () {
                $(this).datepicker("hide");
            });
    });
}
function man_info_regman_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/mante/info/regman/regman.datos.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
        $("#tabla-regman").dataTable({});
    });
}
function man_info_regman_aviario(avi) {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/mante/info/regman/regman.resumen.aviario.php", { fini: fini, ffin: ffin, avi: avi }, function (res) {
        $("#datos").html(res);
    });
}
function man_info_regman_partes(parte) {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/mante/info/regman/regman.resumen.parte.php", { fini: fini, ffin: ffin, parte: parte }, function (res) {
        $("#datos").html(res);
    });
}
function man_info_regman_partes_detalles_aviario(parte, avi) {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/mante/info/regman/regman.resumen.parte.detalles.aviario.php", { fini: fini, ffin: ffin, parte: parte, avi: avi }, function (res) {
        $("#detalles").html(res);
    });
}
function man_info_regman_partes_detalles_tipo(parte, tipo) {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/mante/info/regman/regman.resumen.parte.detalles.tipo.php", { fini: fini, ffin: ffin, parte: parte, tipo: tipo }, function (res) {
        $("#detalles").html(res);
    });
}
function man_info_regman_form() {
    $("#regman-form-modal")
        .modal("show")
        .on("hidden.bs.modal", function () {
            man_info_regman_datos();
        });
    $.get("apps/mante/info/regman/regman.form.php", {}, function (res) {
        $("#form-box").html(res);
        var opt;
        $("#regman-form button").click(function () {
            opt = $(this).attr("opt");
        });
        $("#regman-form").on("submit", function (ev) {
            ev.preventDefault();
            man_info_regman_reg(opt);
        });
        $("#fecha")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $.get(
            "apps/mante/info/regman/regman.lista.partes.php",
            function (data) {
                $("#parte").typeahead({ source: data });
            },
            "json"
        );
        $.get(
            "apps/mante/info/regman/regman.lista.aviarios.php",
            function (data) {
                $("#maquina").typeahead({ source: data });
            },
            "json"
        );
        $.get(
            "apps/mante/info/regman/regman.lista.tipos.php",
            function (data) {
                $("#tipo").typeahead({ source: data });
            },
            "json"
        );
        $("#tparada").on("click", function () {
            $(this).select();
        });
        $("#hhombres").on("click", function () {
            $(this).select();
        });
    });
}
function man_info_regman_reg(opt) {
    var fecha = $("#fecha").val();
    var tman = $("#tman").val();
    var maquina = $("#maquina").val();
    var parte = $("#parte").val();
    var evento = $("#evento").val();
    var tipo = $("#tipo").val();
    var trab = $("#trab").val();
    var piezas = $("#piezas").val();
    var tparada = $("#tparada").val();
    var respo = $("#respo").val();
    var hhombres = $("#hhombres").val();
    loading();
    $.post("apps/mante/info/regman/regman.reg.php", { fecha: fecha, maquina: maquina, parte: parte, evento: evento, tipo: tipo, trab: trab, tparada: tparada, respo: respo, hhombres: hhombres }, function () {
        loadingClose();
        if (opt == "cerrar") {
            $("#regman-form-modal").modal("hide");
            man_info_regman_datos();
        } else if (opt == "seguir") {
            $("#regman-form")[0].reset();
        }
    });
}
function man_info_regman_resumen() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    $.get("apps/mante/info/regman/regman.resumen.general.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
    });
}
function man_otsap() {
    loading();
    $.get("apps/mante/otsap/otsap.php", {}, function (res) {
        $("#contenido").html(res);
        var filename = "Lista OT-SAP";
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        dato = data;
                        return dato;
                    },
                },
            },
        };
        $("#ot-table").DataTable({
            order: [[1, "desc"]],
            dom: "Bfrtip",
            buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", title: filename })],
            aoColumns: [null, { sType: "date-uk" }, null, null, null, null, null, null, null, null, null, null],
        });
        loadingClose();
    });
}
function man_otsap() {
    loading();
    $.get("apps/mante/otsap/otsap.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            man_otsap_datos();
        });
        $("#fini").datepicker({ autoclose: true, endDate: "0D" });
        $("#ffin").datepicker({ autoclose: true, endDate: "0D" });
        loadingClose();
    });
}
function man_otsap_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    loading();
    $.get("apps/mante/otsap/otsap.datos.php", { fini: fini, ffin: ffin }, function (res) {
        $("#datos").html(res);
        var filename = "Lista OT-SAP - " + fini + " hasta " + ffin;
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        dato = data;
                        return dato;
                    },
                },
            },
        };
        $("#ot-table").dataTable({
            order: [[1, "asc"]],
            dom: "Bfrtip",
            buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", title: filename })],
            aoColumns: [null, { sType: "date-uk" }, null, { sType: "date-uk" }, null, null, null, null, null, null, null, null, null],
        });
        var filename2 = "Lista OT-SAP - Pendientes anteriores - Periodo " + fini + " hasta " + ffin;
        var buttonCommon = {
            exportOptions: {
                format: {
                    body: function (data, column, row, node) {
                        var dato = "";
                        dato = data;
                        return dato;
                    },
                },
            },
        };
        $("#pen-table").dataTable({
            order: [[1, "asc"]],
            dom: "Bfrtip",
            buttons: [$.extend(true, {}, buttonCommon, { extend: "excelHtml5", title: filename2 })],
            aoColumns: [null, { sType: "date-uk" }, null, null, null, null, null, null, null, null, null],
        });
        loadingClose();
    });
}
function man_otsap_detalle(id) {}
function man_articulos(tv) {
    loading();
    $.get("apps/mante/articulos/articulos.php", { tv: tv }, function (res) {
        $("#contenido").html(res);
        $("#art-table").dataTable({ order: [[1, "asc"]], columnDefs: [{ orderable: false, targets: [0] }] });
        loadingClose();
    });
}
function man_articulo_info(art) {
    $("#art-info-box").modal("show");
    $.get("apps/mante/articulos/articulo.info.php", { art: art }, function (res) {
        $("#art-info").html(res);
    });
}
function man_artmov() {
    loading();
    $.get("apps/mante/articulos/artmov.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            man_artmov_datos();
        });
        $("#fini")
            .datepicker({ autoclose: true, endDate: "0D" })
            .change(function () {
                man_artmov_datos();
            });
        $("#ffin")
            .datepicker({ autoclose: true, endDate: "0D" })
            .change(function () {
                man_artmov_datos();
            });
        loadingClose();
    });
}
function man_artmov_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    if (fini != "" && ffin != "") {
        loading();
        $.get("apps/mante/articulos/artmov.datos.php", { fini: fini, ffin: ffin }, function (res) {
            $("#datos").html(res);
            $("#tabla-mov").dataTable({});
            loadingClose();
        });
    }
}
function log_depositos() {
    loading();
    $.get("apps/log/depositos/depositos.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
        $("#depo-form").on("submit", function (ev) {
            ev.preventDefault();
            log_deposito_reg();
        });
    });
}
function log_deposito_form(id) {
    $("#depo-form-box").modal("show");
    if (id != "") {
    }
}
function log_deposito_reg(id) {
    var deposito = $("#deposito").val();
    var sap = $("#sap").val();
    loading();
    $.get("apps/log/depositos/deposito.reg.php", { id: id, deposito: deposito, sap: sap }, function () {
        $("#depo-form-box").modal("hide");
        loadingClose();
        log_depositos();
    });
}
function log_articulos() {
    loading();
    $.get("apps/log/articulos/articulos.php", {}, function (res) {
        $("#contenido").html(res);
        $("#art-table").dataTable({ order: [[1, "asc"]] });
        loadingClose();
    });
}
function log_articulo_info(art) {
    $("#art-info-box").modal("show");
    $.get("apps/log/articulos/articulo.info.php", { art: art }, function (res) {
        $("#art-info").html(res);
    });
}
function log_artmov() {
    loading();
    $.get("apps/log/articulos/artmov.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            log_artmov_datos();
        });
        $("#fini")
            .datepicker({ autoclose: true, endDate: "0D" })
            .change(function () {
                log_artmov_datos();
            });
        $("#ffin")
            .datepicker({ autoclose: true, endDate: "0D" })
            .change(function () {
                log_artmov_datos();
            });
        loadingClose();
    });
}
function log_artmov_datos() {
    var fini = $("#fini").val();
    var ffin = $("#ffin").val();
    if (fini != "" && ffin != "") {
        loading();
        $.get("apps/log/articulos/artmov.datos.php", { fini: fini, ffin: ffin }, function (res) {
            $("#datos").html(res);
            $("#tabla-mov").dataTable({});
            loadingClose();
        });
    }
}
function ppr_pro_info_ini(ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info/ini.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_pro_info_ini($(this).val());
        });
    });
}
function ppr_pro_info_mec_bloques(ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info/mec/mec.bloques.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_pro_info_mec_bloques($(this).val());
        });
    });
}
function ppr_pro_info_mec_bloque_detalle(ano, mes) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info/mec/mec.bloque.detalle.php", { ano: ano, mes: mes }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_pro_info_mec_bloque_detalle($(this).val(), $("#mes").val());
        });
        $("#mes").on("change", function () {
            ppr_pro_info_mec_bloque_detalle($("#ano").val(), $(this).val());
        });
    });
}
function ppr_pro_info_lotes(ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info/lotes/lotes.php", { ano: ano }, function (res) {
        $("#contenido").html(res);
        $("#ano").on("change", function () {
            ppr_pro_info_lotes($(this).val());
        });
    });
}
function ppr_pro_cal() {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/calc/procal.php", {}, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_pro_cal_form(id) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/calc/procal.form.php", { id: id }, function (res) {
        $("#popup-content").html(res);
        $("#procal-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_cal_reg(id);
        });
        $("#fvige")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
    });
}
function ppr_pro_cal_reg(id) {
    var n = $("#ver").val();
    var v = $("#vige").val();
    var f = $("#fvige").val();
    var o = $("#obs").val();
    loader("#popup-content");
    $.post("apps/proyeccion/ppr/calc/procal.reg.php", { id: id, n: n, v: v, f: f, o: o }, function (j) {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(j.id);
    });
}
function ppr_pro_clone(id) {
    $("#popup").modal("show");
    $("#popup-content").html("");
    $.get("apps/proyeccion/ppr/ver/ver.clone.form.php", { id: id }, function (res) {
        $("#popup-content").html(res);
        $("#verclone-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_clone_exe(id);
        });
    });
}
function ppr_pro_clone_exe(id) {
    loading("");
    var ver = $("#ver").val();
    var obs = $("#obs").val();
    $.get("apps/proyeccion/ppr/ver/ver.clone.exe.php", { id: id, ver: ver, obs: obs }, function (j) {
        $("#popup-content").html("");
        $("#popup").modal("hide");
        loadingClose();
        ppr_pro_cal();
    });
}
function ppr_pro_prm(ver) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/param/param.form.php", { ver: ver }, function (res) {
        $("#popup-content").html(res);
        $("#pro-param-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_prm_reg(ver);
        });
    });
}
function ppr_pro_prm_reg(ver) {
    var raza = $("#raza").val();
    var eprodd = $("#eprodd").val();
    var promor = $("#promor").val();
    var epredd = $("#epredd").val();
    var predias = $("#predias").val();
    var premor = $("#premor").val();
    $.post("apps/proyeccion/ppr/param/param.reg.php", { ver: ver, raza: raza, eprodd: eprodd, promor: promor, epredd: epredd, predias: predias, premor: premor }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal();
    });
}
function ppr_pro_cal_lotes(ver) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.php", { ver: ver }, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_pro_cal_lotes_calendario(ver, ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.calendario.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
        for (var m = 1; m <= 12; m++) {
            ppr_pro_cal_lotes_calendario_datos(ver, m);
        }
    });
}
function ppr_pro_cal_lotes_calendario_datos(ver, mes) {
    var ano = $("#ano").val();
    var f = $("#cal-" + mes).attr("fecha");
    $("#cal-" + mes).fullCalendar({
        header: { left: "", center: "title", right: "" },
        defaultDate: f,
        eventSources: [{ url: "apps/proyeccion/ppr/calc/procal.lotes.calendario.datos.php?ver=" + ver + "&ano=" + ano + "&mes=" + mes, color: "blue", textColor: "white", allDayDefault: true }],
        eventClick: function (event, jsEvent, view) {
            ppr_pro_cal_lotes_calendario_detalle(ver, event.idlote);
        },
    });
}
function ppr_pro_cal_lotes_calendario_detalle(ver, lote) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/procal.lotes.calendario.detalle.php", { ver: ver, lote: lote }, function (res) {});
}
function ppr_pro_lotes_delete(ver, lote) {
    $("#popup").modal("show");
    loader("#popup-content");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.delete.php", { ver: ver, lote: lote }, function (res) {
        $("#popup-content").html(res);
    });
}
function ppr_pro_lotes_delete_exe(ver, lote) {
    loader("#popup-content");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.delete.exe.php", { ver: ver, lote: lote }, function (res) {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(ver);
    });
}
function ppr_pro_cal_lotes_form(ver, lote) {
    $("#popup").modal("show");
    loader("#popup-content");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.form.php", { ver: ver, lote: lote }, function (res) {
        $("#popup-content").html(res);
        $("#lotes-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_lotes_reg(ver);
        });
        $("#fnac")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                ppr_pro_lotes_fcalc();
                $(this).datepicker("hide");
            });
        $("#fnac2")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            });
        $("#fnac").inputmask("99/99/9999", {
            placeholder: "dd/mm/aaaa",
            oncomplete: function () {
                ppr_pro_lotes_fcalc();
            },
        });
        $("#fnac2").inputmask("99/99/9999", { placeholder: "dd/mm/aaaa" });
        $("#eprod").on("change", function () {
            ppr_pro_lotes_fcalc();
        });
        $("#eprede").on("change", function () {
            ppr_pro_lotes_fcalc();
        });
    });
}
function ppr_pro_lotes_fcalc() {
    var fnac = $("#fnac").val();
    var eprede = $("#eprede").val();
    var eprod = $("#eprod").val();
    if (fnac != "") {
        $.post("apps/proyeccion/ppr/calc/procal.lotes.fcalc.php", { fnac: fnac, eprede: eprede, eprod: eprod }, function (j) {
            $("#fnac2").val(j.fnac2);
            $("#fprede").val(j.fprede);
            $("#epredes").val(j.epredes);
            $("#fprod").val(j.fprod);
            $("#eprods").val(j.eprods);
        });
    }
}
function ppr_pro_lotes_reg(ver) {
    var id = $("#id").val();
    var lote = $("#lote").val();
    var raza = $("#raza").val();
    var fnac = $("#fnac").val();
    var fnac2 = $("#fnac2").val();
    var aves = $("#aves").val();
    var avi = $("#avi").val();
    var eprod = $("#eprod").val();
    var epred = $("#eprede").val();
    var obs = $("#obs").val();
    $("#popup").modal("hide");
    $.post("apps/proyeccion/ppr/calc/procal.lotes.reg.php", { ver: ver, id: id, lote: lote, raza: raza, fnac: fnac, fnac2: fnac2, aves: aves, avi: avi, eprod: eprod, epred: epred, obs: obs }, function (j) {
        ppr_pro_cal_lotes(ver);
    });
}
function ppr_pro_cal_calendario(ver) {
    var ano = $("#ano").val();
    $.post("apps/proyeccion/ppr/calc/procal.calendario.php", { ver: ver, ano: ano }, function (res) {});
}
function ppr_pro_lotes_import(ver) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/lotes/import.php", { ver: ver }, function (res) {
        $("#contenido").html(res);
        $("#ver").on("change", function () {
            ppr_pro_lotes_import_disponibles(ver, $(this).val());
            ppr_pro_lotes_import_registrados(ver, $(this).val());
        });
    });
}
function ppr_pro_lotes_import_disponibles(ver, dis) {
    loader("#disponibles");
    $.post("apps/proyeccion/ppr/lotes/import.lotes.php", { ver: ver, dis: dis }, function (res) {
        $("#disponibles").html(res);
    });
}
function ppr_pro_lotes_import_registrados(ver, dis) {
    loader("#registrados");
    $.post("apps/proyeccion/ppr/lotes/import.registrados.php", { ver: ver, dis: dis }, function (res) {
        $("#registrados").html(res);
    });
}
function ppr_pro_lotes_import_exe(ver, dis, lote, tmov) {
    loader("#disponibles");
    loader("#registrados");
    $.post("apps/proyeccion/ppr/lotes/import.reg.php", { ver: ver, dis: dis, lote: lote, tmov: tmov }, function () {
        ppr_pro_lotes_import_disponibles(ver, dis);
        ppr_pro_lotes_import_registrados(ver, dis);
    });
}
function ppr_pro_precal_clone(ori_ver_id, ori_lot_id, des_ver_id, des_lot_id) {
    loader("#contenido");
    $.get("apps/proyeccion/ppr/calc/precalc.clone.php", { ovi: ori_ver_id, oli: ori_lot_id, dvi: des_ver_id, dli: des_lot_id }, function () {
        ppr_pro_cal_lotes(des_ver_id);
    });
}
function ppr_pro_precal(ver, fecha) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/calc/precal.php", { ver: ver, fecha: fecha }, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_pro_precal_form(ver, lote, fecha) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/calc/precal.form.php", { ver: ver, lote: lote, fecha: fecha }, function (res) {
        $("#popup-content").html(res);
        $("#precal-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_precal_reg(ver, lote, fecha);
        });
        $("#fventa")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
            })
            .inputmask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    });
}
function ppr_pro_precal_reg(ver, lote, fecha) {
    var fventa = $("#fventa").val();
    var cventa = $("#cventa").val();
    $.post("apps/proyeccion/ppr/calc/precal.reg.php", { ver: ver, lote: lote, fventa: fventa, cventa: cventa }, function () {
        $("#popup").modal("hide");
        ppr_pro_precal(ver, fventa);
    });
}
function ppr_pro_aju(ver, lote) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/ppr/calc/procal.ajuste.form.php", { ver: ver, lote: lote }, function (res) {
        $("#popup-content").html(res);
        $("#ajuste-form").on("submit", function (ev) {
            ev.preventDefault();
            ppr_pro_aju_reg(ver, lote);
        });
        $("#fecha")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("changeDate", function () {
                $(this).datepicker("hide");
                ppr_pro_aju_fcalc(ver, lote, $(this).val());
            })
            .inputmask("99/99/9999", {
                placeholder: "dd/mm/aaaa",
                oncomplete: function () {
                    ppr_pro_aju_fcalc(ver, lote, $(this).val());
                },
            });
        $("#eprede").on("change", function () {
            ppr_pro_aju_fcalc(ver, lote, $("#fecha").val());
        });
        $("#nsaldo").on("change", function () {
            var saldo = $("#saldo").val();
            var ajuste = $(this).val() - saldo;
            $("#ajuste").val(ajuste);
        });
    });
}
function ppr_pro_aju_fcalc(ver, lote, fecha) {
    var eprede = $("#eprede").val();
    $.post("apps/proyeccion/ppr/calc/procal.ajuste.fcalc.php", { ver: ver, lote: lote, fecha: fecha, eprede: eprede }, function (j) {
        $("#edadd").val(j.edadd);
        $("#edads").val(j.edads);
        $("#epredes").val(j.epreds);
        $("#fprede").val(j.fprede);
        $("#saldo").val(j.saldo);
    });
}
function ppr_pro_aju_reg(ver, lote) {
    var edadd = $("#edadd").val();
    var nsaldo = $("#nsaldo").val();
    var ajuste = $("#ajuste").val();
    var epredd = $("#eprede").val();
    $.post("apps/proyeccion/ppr/calc/procal.ajuste.reg.php", { ver: ver, lote: lote, edadd: edadd, nsaldo: nsaldo, ajuste: ajuste, epredd: epredd }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(ver);
    });
}
function ppr_pro2_info(ver, ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info2/info.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
    });
}
function ppr_pro2_info_mes(ver, ano, mes) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info2/info.mes.php", { ver: ver, ano: ano, mes: mes }, function (res) {
        $("#contenido").html(res);
        $("#mes").on("change", function () {
            var nmes = $("#mes").val();
            var nano = $("#ano").val();
            ppr_pro2_info_mes(ver, nano, nmes);
        });
        $("#ano").on("change", function () {
            var nmes = $("#mes").val();
            var nano = $("#ano").val();
            ppr_pro2_info_mes(ver, nano, nmes);
        });
    });
}
function ppr_pro2_info_haikei(ver, ano, mes) {
    $("#popup").modal("show");
    loader("#popup-content");
    $.get("apps/proyeccion/ppr/info2/info.haikei.mes.php", { ver: ver, ano: ano, mes: mes }, function (res) {
        $("#popup-content").html(res);
    });
}
function ppr_pro2_info_grafico(ver, ano) {
    loader("#contenido");
    $.post("apps/proyeccion/ppr/info2/info.grafico.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
        ppr_pro2_info_grafico_render(ver, ano);
    });
}
function ppr_pro2_info_grafico_render(ver, ano) {
    var ancho = $("#grafico").width() - 10;
    var ancho_grafico = ancho * 1;
    var strURL = "apps/proyeccion/ppr/info2/info.grafico.datos.php?ver=" + ver + "&ano=" + ano;
    var chart1 = new FusionCharts({ type: "mscombidy2d", renderAt: "grafico", width: ancho_grafico, height: "500", dataFormat: "xmlurl", dataSource: strURL });
    chart1.render();
}
function ppr_pro_calendario(ver, ano) {
    loading("Consultando la Base de Datos");
    $.get("apps/proyeccion/ppr/calendario/calendario.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
        loadingClose();
        for (var m = 1; m <= 12; m++) {
            ppr_pro_calendario_datos(ver, ano, m);
        }
    });
}
function ppr_pro_calendario_datos(ver, ano, mes) {
    loader("#mes-" + mes);
    $.get("apps/proyeccion/ppr/calendario/calendario.mes.php", { ver: ver, ano: ano, mes: mes }, function (res) {
        $("#mes-" + mes).html(res);
    });
}
function rec_pro_prm(ver) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/rec/param/param.form.php", { ver: ver }, function (res) {
        $("#popup-content").html(res);
        $("#rec-param-form").on("submit", function (ev) {
            ev.preventDefault();
            rec_pro_prm_reg(ver);
        });
    });
}
function rec_pro_prm_reg(ver) {
    var bonif = $("#bonif").val();
    var merma = $("#merma").val();
    $.post("apps/proyeccion/rec/param/param.reg.php", { ver: ver, bonif: bonif, merma: merma }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal();
    });
}
function rec_pry_lote_form(ver, plote) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/rec/lotes/rec.lote.form.php", { ver: ver, plote: plote }, function (res) {
        $("#popup-content").html(res);
        $("#rlote-form").on("submit", function (ev) {
            ev.preventDefault();
            rec_pry_lote_reg(ver, plote);
        });
        $("#grupo").on("change", function () {
            rec_pry_lote_form_datos(ver, plote);
        });
        $("#merma").on("change", function () {
            rec_pry_lote_form_datos(ver, plote);
        });
        $("#bonif").on("change", function () {
            rec_pry_lote_form_datos(ver, plote);
        });
    });
}
function rec_pry_lote_delman(ver, plote) {
    $("#popup").modal("show");
    $.post("apps/proyeccion/rec/lotes/rec.lote.delman.php", { ver: ver, plote: plote }, function (res) {
        $("#popup-content").html(res);
        $("#rlote-form").on("submit", function (ev) {
            ev.preventDefault();
            rec_pry_lote_delman_exe(ver, plote);
        });
        $("#grupo").on("change", function () {
            rec_pry_lote_delman_datolote(ver, plote, $(this).val());
        });
    });
}
function rec_pry_lote_delman_datolote(ver, plote, grupo) {
    $.post("apps/proyeccion/rec/lotes/rec.lote.delman.datolote.php", { ver: ver, plote: plote, grupo: grupo }, function (j) {
        $("#fnac").val(j.fnac);
        $("#rlote").val(j.rlote);
    });
}
function rec_pry_lote_delman_exe(ver, plote) {
    var grupo = $("#grupo").val();
    $.post("apps/proyeccion/rec/lotes/rec.lote.delman.exe.php", { ver: ver, plote: plote, grupo: grupo }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(ver);
    });
}
function rec_pry_lote_form_datos(ver, plote) {
    var grupo = $("#grupo").val();
    var merma = $("#merma").val();
    var bonif = $("#bonif").val();
    $.post("apps/proyeccion/rec/lotes/rec.lote.form.datos.php", { ver: ver, plote: plote, grupo: grupo, merma: merma, bonif: bonif }, function (j) {
        $("#rlote").val(j.rlote);
        $("#fnac").val(j.fnac);
        $("#aves").val(j.avesini);
        $("#eprodd").val(j.eprodd);
        $("#eprods").val(j.eprods);
        $("#fprod").val(j.fprod);
    });
}
function rec_pry_lote_reg(ver, plote) {
    var grupo = $("#grupo").val();
    var rlote = $("#rlote").val();
    var bonif = $("#bonif").val();
    var merma = $("#merma").val();
    var manejo = $("#manejo").val();
    var obs = $("#obs").val();
    $.post("apps/proyeccion/rec/lotes/rec.lote.reg.php", { ver: ver, plote: plote, grupo: grupo, rlote: rlote, bonif: bonif, merma: merma, manejo: manejo, obs: obs }, function () {
        $("#popup").modal("hide");
        ppr_pro_cal_lotes(ver);
    });
}
function rec_pry_lotes(ver) {
    loader("#contenido");
    $.post("apps/proyeccion/rec/lotes/rec.lotes.php", { ver: ver }, function (res) {
        $("#contenido").html(res);
    });
}
function rec_pry_lotes_calendario(ver, ano) {
    loader("#contenido");
    $.post("apps/proyeccion/rec/lotes/rec.lote.calendario.php", { ver: ver, ano: ano }, function (res) {
        $("#contenido").html(res);
        for (var m = 1; m <= 12; m++) {
            rec_pry_lotes_calendario_datos(ver, m);
        }
    });
}
function rec_pry_lotes_calendario_datos(ver, mes) {
    var ano = $("#ano").val();
    var f = $("#cal-" + mes).attr("fecha");
    $("#cal-" + mes).fullCalendar({
        header: { left: "", center: "title", right: "" },
        defaultDate: f,
        eventSources: [{ url: "apps/proyeccion/rec/lotes/rec.lote.calendario.datos.php?ver=" + ver + "&ano=" + ano + "&mes=" + mes, color: "blue", textColor: "white", allDayDefault: true }],
        eventClick: function (event, jsEvent, view) {},
    });
}
function sys_users() {
    loader("#contenido");
    $.get("apps/sys/users/users.php", {}, function (res) {
        $("#contenido").html(res);
        $("#tabla-users").dataTable({
            language: { url: "js/bower_components/datatables.net/i18n/Spanish.json" },
            dom: "Bfrtip",
            buttons: [
                {
                    text: '<i class="fa fa-plus-circle"></i> agregar usuario',
                    action: function (e, dt, node, config) {
                        sys_users_form("");
                    },
                },
            ],
        });
        close_control_sidebar();
    });
}
function sys_users_act(uid, act) {
    $.post("apps/sys/users/users.act.php", { uid: uid, act: act }, function (j) {
        if (j.uactivo == 0) {
            $("#usr-" + uid).addClass("text-tachado text-red");
            $("#usr-act-btn-" + uid).html('<button class="btn btn-xs btn-danger" onclick="sys_users_act(\'' + uid + "','t');\">Inactivo</button>");
        } else {
            $("#usr-" + uid).removeClass("text-tachado text-red");
            $("#usr-act-btn-" + uid).html('<button class="btn btn-xs btn-success" onclick="sys_users_act(\'' + uid + "','f');\">Activo</button>");
        }
    });
}
function sys_users_form(uid) {
    $("#popup").modal("show");
    $.post("apps/sys/users/users.form.php", { uid: uid }, function (res) {
        $("#popup-content").html(res);
        $("#users-form").on("submit", function (e) {
            e.preventDefault();
            sys_users_reg();
        });
    });
}
function sys_users_reg() {}
function sys_users_passwd_form(user) {
    $("#popup").modal("show");
    $.get("apps/sys/users/users.passwd.form.php", { user: user }, function (res) {
        $("#popup-content").html(res);
        $("#passwd-form").on("submit", function (ev) {
            ev.preventDefault();
            sys_users_passwd_reg(user);
        });
    });
}
function sys_users_passwd_reg(user) {
    var passwd = $("#passwd").val();
    $.get("apps/sys/users/users.passwd.reg.php", { user: user, passwd: passwd }, function () {
        $("#popup").modal("hide");
        sys_users();
    });
}
function sys_users_modulos(uid) {
    loading("Consultando la Base de Datos...");
    $.post("apps/sys/users/users.modulos.php", { uid: uid }, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function sys_users_modulo_reg(legajo, modulo, tmov, version) {
    $.post("apps/sys/users/users.modulos.reg.php", { legajo: legajo, modulo: modulo, tipomov: tmov, version: version }, function (j) {
        if (j.estado == 0) {
            $("#moduser-" + version + "-" + legajo + "-" + modulo).html(
                '<button class="btn btn-danger btn-xs" onclick="sys_users_modulo_reg(\'' + legajo + "','" + modulo + "',1," + version + ');" title="click para asignar m&oacute;dulo">No asignado</button>'
            );
        } else if (j.estado == 1) {
            $("#moduser-" + version + "-" + legajo + "-" + modulo).html(
                '<button class="btn btn-success btn-xs" onclick="sys_users_modulo_reg(\'' + legajo + "','" + modulo + "',0," + version + ');" title="click para quitar asignaci&oacute;n de m&oacute;dulo">Asignado</button>'
            );
        }
    });
}
function sys_users_resetpass_form(user) {
    $("#popup").modal("show");
    $.post("apps/sys/users/users.resetpass.form.php", { user: user }, function (res) {
        $("#popup-content").html(res);
        $("#users-form").on("submit", function (e) {
            e.preventDefault();
        });
    });
}
function sys_pin() {
    loading("Consultando la Base de Datos. Aguarde un momento...");
    $.get("apps/sys/pin_card/pin_card.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function sys_pin_det(card) {
    $("#popup").modal("show");
    loading("Consultando la Base de Datos. Aguarde un momento...");
    $.get("apps/sys/pin_card/pin_card.det.php", { card: card }, function (res) {
        $("#popup-content").html(res);
        loadingClose();
    });
}
function sys_pin_gen(card) {
    loading("Generando c&oacute;digos...");
    $.get("apps/sys/pin_card/pin_card.gen.php", { card: card }, function (res) {
        loadingClose();
        sys_pin();
    });
}
function sys_funcionarios() {
    loading("Consultando la Base de Datos...");
    close_control_sidebar();
    $.get("apps/sys/funcionarios/funcionarios.php", {}, function (res) {
        $("#contenido").html(res);
        $("#tabla-funcionarios").dataTable({ language: { url: "js/bower_components/datatables.net/i18n/Spanish.json" } });
        loadingClose();
    });
}
function sys_funcionarios_user_form(legajo) {
    $("#popup").modal("show");
    loading("Consultando la Base de Datos...");
    $.post("apps/sys/funcionarios/funcionarios.users.form.php", { legajo: legajo }, function (res) {
        $("#popup-content").html(res);
        $("#uname-msg").hide();
        $("#users-form").on("submit", function (e) {
            e.preventDefault();
            sys_funcionarios_user_reg();
        });
        $("#uname").on("change", function () {
            if ($(this).val() != "") {
                sys_funcionarios_user_check_uname();
            }
        });
        loadingClose();
    });
}
function sys_funcionarios_user_check_uname() {
    $("#uname-msg").html('<span class="text-green blink">Chequeando disponibilidad de nombre de usuario...</span>').show();
    var uname = $("#uname").val();
    $.post("apps/sys/funcionarios/funcionarios.users.check.uname.php", { uname: uname }, function (j) {
        if (j.users > 0) {
            $("#uname").val("");
            $("#uname-msg").html('<span class="text-red"><i class="fa fa-times"></i> El nombre de usuario ingresado est&aacute; ocupado.</span>');
        } else {
            $("#uname-msg").html('<span class="text-green"><i class="fa fa-check"></i> OK. El nombre de usuario ingresado est&aacute; disponible.</span>');
        }
    });
}
function sys_funcionarios_user_reg() {
    var legajo = $("#legajo").val();
    var uname = $("#uname").val();
    var pass = $("#pass").val();
    var jefe = $("#jefe").val();
    loading("Consultando la Base de Datos...");
    $.post("apps/sys/funcionarios/funcionarios.users.reg.php", { legajo: legajo, uname: uname, pass: pass, jefe: jefe }, function (j) {
        $("#popup-content").html("");
        $("#popup").modal("hide");
        if (j.reg == 1) {
            sys_funcionarios_user_modulos(legajo);
        }
        loadingClose();
    });
}
function sys_funcionarios_user_modulos(legajo) {
    loading("Consultando la Base de Datos...");
    $.post("apps/sys/funcionarios/funcionarios.users.modulos.php", { legajo: legajo }, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function sys_funcionarios_user_modulo_reg(legajo, modulo, tmov, version) {
    $.post("apps/sys/funcionarios/funcionarios.users.modulos.reg.php", { legajo: legajo, modulo: modulo, tipomov: tmov, version: version }, function (j) {
        if (j.estado == 0) {
            $("#moduser-" + version + "-" + legajo + "-" + modulo).html(
                '<button class="btn btn-danger btn-xs" onclick="sys_funcionarios_user_modulo_reg(\'' + legajo + "','" + modulo + "',1," + version + ');" title="click para asignar m&oacute;dulo">No asignado</button>'
            );
        } else if (j.estado == 1) {
            $("#moduser-" + version + "-" + legajo + "-" + modulo).html(
                '<button class="btn btn-success btn-xs" onclick="sys_funcionarios_user_modulo_reg(\'' + legajo + "','" + modulo + "',0," + version + ');" title="click para quitar asignaci&oacute;n de m&oacute;dulo">Asignado</button>'
            );
        }
    });
}
function sys_rec_utils_pesaje() {
    loading("");
    $.get("apps/sys/rec_import_pesaje/rec.import.pesaje.php", {}, function (res) {
        $("#contenido").html(res);
        loadingClose();
    });
}
function sys_rec_utils_pesaje_procesar(lote, fecha) {
    loading("");
    $.get("apps/sys/rec_import_pesaje/rec.import.pesaje.exe.php", { lote: lote, fecha: fecha }, function (res) {
        sys_rec_utils_pesaje();
        loadingClose();
    });
}
function sys_asistencias() {
    loading("");
    $.get("apps/sys/asistencias/asistencias.php", {}, function (res) {
        $("#contenido").html(res);
        $("#asi-form").on("submit", function (ev) {
            ev.preventDefault();
            sys_asistencias_datos();
        });
        $("#ano").on("change", function () {
            sys_asistencias_datos();
        });
        $("#mes").on("change", function () {
            sys_asistencias_datos();
        });
        loadingClose();
    });
}
function sys_asistencias_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    loading("");
    $.get("apps/sys/asistencias/asistencias.datos.php", { mes: mes, ano: ano }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function sys_salmin() {
    $.get("apps/sys/salmin/salmin.php", {}, function (res) {
        $("#contenido").html(res);
        $("#opt-form").on("submit", function (ev) {
            ev.preventDefault();
            sys_salmin_confirm();
        });
        $("#fecha")
            .datepicker({ language: "es", format: "dd/mm/yyyy" })
            .on("change", function () {
                $(this).datepicker("hide");
            });
    });
}
function sys_salmin_confirm() {
    Swal.fire({
        title: "Atención!",
        text: "Está seguro que quiere actualizar el salario mínimo del sistema PEGASUS?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Actualizar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            sys_salmin_exe();
        }
    });
}
function sys_salmin_exe() {
    var fecha = $("#fecha").val();
    var salmin = $("#salmin").val();
    var jornal = $("#jornal").val();
    var prueba = $("#prueba").val();
    loading("");
    $.get("apps/sys/salmin/salmin.exe.php", { fecha: fecha, salmin: salmin, jornal: jornal, prueba: prueba }, function (res) {
        $("#datos").html(res);
        loadingClose();
    });
}
function sys_saldohuevos() {
    $.get("apps/sys/saldohuevos/saldohuevos.php", {}, function (res) {
        $("#contenido").html(res);
        $("#filtro-form").on("submit", function (ev) {
            ev.preventDefault();
            sys_saldohuevos_datos();
        });
        $("#mes").on("change", function () {
            $("#datos").html("");
        });
        $("#ano").on("change", function () {
            $("#datos").html("");
        });
    });
}
function sys_saldohuevos_datos() {
    var mes = $("#mes").val();
    var ano = $("#ano").val();
    $("#datos").html("Cargando...");
    $.get("apps/sys/saldohuevos/saldohuevos.datos.php", { mes: mes, ano: ano }, function (res) {
        $("#datos").html(res);
        sys_saldohuevos_onSelect();
    });
}
function sys_saldohuevos_onSelect() {
    var editables = document.querySelectorAll("[contentEditable]");
    for (var i = 0, len = editables.length; i < len; i++) {
        editables[i].setAttribute("data-orig", editables[i].innerHTML);
        editables[i].onfocus = function () {
            celda_editable_selectElement(this);
        };
        editables[i].onblur = function () {
            if (this.innerHTML == this.getAttribute("data-orig")) {
                this.innerHTML = this.getAttribute("data-orig");
            } else {
                this.setAttribute("data-orig", this.innerHTML);
                var valor = this.getAttribute("data-orig");
                var regex = /<br\s*[\/]?>/gi;
                valor = valor.replace(regex, "");
                var dia = this.getAttribute("dia");
                var mes = this.getAttribute("mes");
                var ano = this.getAttribute("ano");
                var tipo = this.getAttribute("tipo");
                sys_saldohuevos_reg(dia, mes, ano, tipo, valor);
            }
        };
    }
}
function sys_saldohuevos_reg(dia, mes, ano, tipo, cant) {
    $.get("apps/sys/saldohuevos/saldohuevos.reg.php", { dia: dia, mes: mes, ano: ano, tipo: tipo, cant: cant }, function (j) {
        var saldo = j.saldo;
        $("#saldo-" + dia).html(saldo);
    });
}
