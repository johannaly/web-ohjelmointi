$(document).ready(function() {
    $(".para").hide();
    $(".header").click((e) => $(e.currentTarget).next().toggle(200));
})