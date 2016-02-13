function getCodecDataset() {
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
  for(var codec in codecDataSet) {
    console.log(codec + ': ', codecDataSet[codec]);
  }
};

getCodecDataset();
