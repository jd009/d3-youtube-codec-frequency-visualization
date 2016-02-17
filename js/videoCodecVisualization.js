/* Constants */
var YOUTUBE_DATASET_TSV_FILE = 'youtube_videos.tsv';
var INVALID_CODEC_NAME = 'none';

/* Functions */
function getCodecDataset() {
  $('#codecDataSummary').append('<p>Loading...</p>');
  d3.tsv(YOUTUBE_DATASET_TSV_FILE, function(error, data){
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

    var codecInfoArray = convertToCodecInfoArray(codecDataSet);
    logCodecDataSet(codecInfoArray);
    visualizeDataSet(codecInfoArray);
  });
}

function logCodecDataSet(codecInfoArray) {
  $('#codecDataSummary').empty();
  $('#codecDataSummary').append('<p>Codec: Frequency Count</p>');
  codecInfoArray.forEach(function(codecInfo) {
    $('#codecDataSummary').append('<p>' + codecInfo.name + ': ' + codecInfo.frequencyCount + '</p>');
  });
}

function visualizeDataSet(codecInfoArray) {
  var width = 960;
  var height = 500;
  var radius = Math.min(width, height) / 2;

  var svg = d3.select('.graph')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')' );

  var color = d3.scale.ordinal()
    .range(['#98abc5', '#7b6888', '#a05d56', '#d0743c', '#ff8c00']);

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return d.frequencyCount; });

  var g = svg.selectAll('.arc')
    .data(pie(codecInfoArray))
    .enter().append('g')
      .attr('class', 'arc');

  g.append('path')
    .attr('d', arc)
    .style('fill', function(d) { return color(d.data.frequencyCount); });

  g.append('text')
    .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
    .attr('dy', '.35em')
    .text(function(d) { return d.data.name; });
}

function convertToCodecInfoArray(codecDataSet) {
  var codecInfoArray = [];
  for(var codec in codecDataSet) {
    var isValidCodec = codec !== INVALID_CODEC_NAME;
    if(isValidCodec) {
      var codecInfo = new CodecInfo(codec, codecDataSet[codec]);
      codecInfoArray.push(codecInfo);
    }
  }

  return codecInfoArray;
}

/* Constructor Function */
function CodecInfo(name, frequencyCount) {
  this.name = name;
  this.frequencyCount = frequencyCount;
}

/* Execution begins */
getCodecDataset();
