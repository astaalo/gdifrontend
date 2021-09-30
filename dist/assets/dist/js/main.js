$(document).ready(function() {
    $('.nav-tabs > li > a').click(function(event) {
      event.preventDefault(); //stop browser to take action for clicked anchor
      //get displaying tab content jQuery selector
      var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');
      //find actived navigation and remove 'active' css
      var actived_nav = $('.nav-tabs > li.active');
      actived_nav.removeClass('active');
      //add 'active' css into clicked navigation
      $(this).parents('li').addClass('active');
      //hide displaying tab content
      $(active_tab_selector).removeClass('active');
      $(active_tab_selector).addClass('hide');
      //show target tab content
      var target_tab_selector = $(this).attr('href');
      $(target_tab_selector).removeClass('hide');
      $(target_tab_selector).addClass('active');
        // $("#manager").removeClass("hide").addClass("active");
        //   $("#account").removeClass("active").addClass("hide")
        //   $(".recruits").show();
        // $(".manager-of-recruits").hide();
      if($("#account").hasClass("active")){
        $(".recruits").hide();
        $(".manager-of-recruits").show();
    }else{
        $(".recruits").show();
        $(".manager-of-recruits").hide(); 
    }
    });
    
    var hCols = [];
    // DataTable initialisation
   var table =  $('.example').DataTable({
        "dom": "<'export'B>",
        "paging": true,
        "autoWidth": true,
        "columnDefs": [{
            "visible": true,
            "targets": hCols
        }],
        "buttons": [{
            extend: 'colvis',
            collectionLayout: 'three-column',
            text: function() {
                var totCols = $('.example thead th').length;
                var hiddenCols = hCols.length;
                var shownCols = totCols - hiddenCols;
                return 'Columns (' + shownCols + ' of ' + totCols + ')';
            },
            prefixButtons: [{
                extend: 'colvisGroup',
                text: 'Show all',
                show: ':hidden'
            }, {
                extend: 'colvisRestore',
                text: 'Restore'
            }]
        }, {
            extend: 'collection',
            text: 'Exporter',
            buttons: [{
                    text: 'Excel',
                    extend: 'excelHtml5',
                    footer: false,
                    exportOptions: {
                        columns: ':visible'
                    }
                }, {
                    text: 'CSV',
                    extend: 'csvHtml5',
                    fieldSeparator: ';',
                    exportOptions: {
                        columns: ':visible'
                    }
                }, {
                    text: 'PDF',
                    extend: 'pdfHtml5',
                    message: '',
                    exportOptions: {
                        columns: ':visible'
                    }
                }]
            }]
        ,oLanguage: {
    oPaginate: {
        sNext: '<span class="pagination-default">&#x276f;</span>',
        sPrevious: '<span class="pagination-default">&#x276e;</span>'
    }
}
            ,"initComplete": function(settings, json) {
                // Adjust hidden columns counter text in button -->
                $('#example').on('column-visibility.dt', function(e, settings, column, state) {
                    var visCols = $('#example thead tr:first th').length;
                    //Below: The minus 2 because of the 2 extra buttons Show all and Restore
                    var tblCols = $('.dt-button-collection li[aria-controls=example] a').length - 2;
                    $('.buttons-colvis[aria-controls=example] span').html('Columns (' + visCols + ' of ' + tblCols + ')');
                    e.stopPropagation();
                });
            }
        });

$(".dropdown1").on("change", function() {
    table
      .columns(1)
      .search(this.value)
      .draw();
  });
  });
const settings={
    fill: '#ff7900',
    background: '#eeeeee',
    width: '100%'
  }
  
  const sliders = document.querySelectorAll('.range-slider');
    Array.prototype.forEach.call(sliders,(slider)=>{
    slider.querySelector('input').addEventListener('input', (event)=>{
      slider.querySelector('span').innerHTML = event.target.value;
      applyFill(event.target);
    });
    applyFill(slider.querySelector('input'));
  });
  
  function applyFill(slider) {
    const percentage = 100*(slider.value-slider.min)/(slider.max-slider.min);
    const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
    slider.style.background = bg;
  }
  