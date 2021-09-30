$(document).ready(function() {
    // $(".li-tab").click(function(){
    //     $(this).addClass("active");
    //     if ( $(this).hasClass('active') ) $(this).removeClass('rot0');
    // });
    //Only needed for the filename of export files.
    //Normally set in the title tag of your page.document.title = 'Simple DataTable';
    //Define hidden columns
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
                    text: 'PDF Portrait',
                    extend: 'pdfHtml5',
                    message: '',
                    exportOptions: {
                        columns: ':visible'
                    }
                }, {
                    text: 'PDF Landscape',
                    extend: 'pdfHtml5',
                    message: '',
                    orientation: 'landscape',
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
  
} );
// I've added annotations to make this easier to follow along at home. Good luck learning and check out my other pens if you found this useful


// First let's set the colors of our sliders
const settings={
    fill: '#1abc9c',
    background: '#d7dcdf'
  }
  
  // First find all our sliders
  const sliders = document.querySelectorAll('.range-slider');
  
  // Iterate through that list of sliders
  // ... this call goes through our array of sliders [slider1,slider2,slider3] and inserts them one-by-one into the code block below with the variable name (slider). We can then access each of wthem by calling slider
  Array.prototype.forEach.call(sliders,(slider)=>{
    // Look inside our slider for our input add an event listener
  //   ... the input inside addEventListener() is looking for the input action, we could change it to something like change
    slider.querySelector('input').addEventListener('input', (event)=>{
      // 1. apply our value to the span
      slider.querySelector('span').innerHTML = event.target.value;
      // 2. apply our fill to the input
      applyFill(event.target);
    });
    // Don't wait for the listener, apply it now!
    applyFill(slider.querySelector('input'));
  });
  
  // This function applies the fill to our sliders by using a linear gradient background
  function applyFill(slider) {
    // Let's turn our value into a percentage to figure out how far it is in between the min and max of our input
    const percentage = 100*(slider.value-slider.min)/(slider.max-slider.min);
    // now we'll create a linear gradient that separates at the above point
    // Our background color will change here
    const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
    slider.style.background = bg;
  }
  



