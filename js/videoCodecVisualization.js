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
  });
}

function logCodecDataSet(codecDataSet) {
  $('#codecDataSummary').empty();
  $('#codecDataSummary').append('<p>Codec: Frequency Count</p>');
  for(var codec in codecDataSet) {
    $('#codecDataSummary').append('<p>' + codec + ': ' + codecDataSet[codec] + '</p>');
  }
};

getCodecDataset();
