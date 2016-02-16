function getCodecDataset() {
  $('#codecDataSummary').append('<p>Loading...</p>');
  d3.tsv('youtube_videos.tsv', function(error, data){
    if(error) throw error;
    var codecDataSet = {};
    data.forEach(function(d) {
      var currentCodec = d.codec;
      if(codecDataSet[currentCodec]) {
        codecDataSet[currentCodec]++;
      } else {
        codecDataSet[currentCodec] = 1;
      }
    });

    logCodecDataSet(codecDataSet);
    visualizeDataSet(codecDataSet);
  });
}

function logCodecDataSet(codecDataSet) {
  $('#codecDataSummary').empty();
  $('#codecDataSummary').append('<p>Codec: Frequency Count</p>');
  for(var codec in codecDataSet) {
    $('#codecDataSummary').append('<p>' + codec + ': ' + codecDataSet[codec] + '</p>');
  }
};

function visualizeDataSet(codecDataSet) {
  var width = 960;
  var height = 500;
  var radius = Math.min(width, height) / 2;

  var svg = d3.select('.graph')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')' );
}

getCodecDataset();
