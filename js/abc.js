var abc = {};
var abcQuery;

abc.construct_query = function (features, distance, comment, callback) {
  var query_parts = [];

  query_parts.push("/*");
  query_parts.push("This has been generated by the overpass-turbo wizard.");
  query_parts.push("*/");

  (function (x) {
    x(null);
  })(function (abcQuery) {
    query_parts.push(
      `
[out:json][bbox:{{bbox}}][timeout:800];

// get set of as
(
  node[` +
        features[0] +
        `]({{bbox}});
  way[` +
        features[0] +
        `]({{bbox}});
  rel[` +
        features[0] +
        `]({{bbox}});
)->.a;

// get set of bs
(
  node[` +
        features[1] +
        `]({{bbox}});
  way[` +
        features[1] +
        `]({{bbox}});
  rel[` +
        features[1] +
        `]({{bbox}});
)->.b;

// get set of cs
(
  node[` +
        features[2] +
        `]({{bbox}});
  way[` +
        features[2] +
        `]({{bbox}});
  rel[` +
        features[2] +
        `]({{bbox}});
)->.c;

// determine set of as near bs
(
  node.a(around.b:` +
        distance +
        `);
  way.a(around.b:` +
        distance +
        `);
  rel.a(around.b:` +
        distance +
        `);
)->.a_near_b;

// determine set of cs near as near bs
(
  node.c(around.a_near_b:` +
        distance +
        `);
  way.c(around.a_near_b:` +
        distance +
        `);
  rel.c(around.a_near_b:` +
        distance +
        `);
)->.c_near_a_near_b;

// determine set of cs near as near bs
(
  node.c(around.a_near_b:` +
        distance +
        `);
  way.c(around.a_near_b:` +
        distance +
        `);
  rel.c(around.a_near_b:` +
        distance +
        `);
)->.c_near_a_near_b;

// determine set of as in range of selected cs
(
  node.a(around.c_near_a_near_b:` +
        distance +
        `);
  way.a(around.c_near_a_near_b:` +
        distance +
        `);
  rel.a(around.c_near_a_near_b:` +
        distance +
        `);
)->.a_near_c_near_a_near_b;

// determine set of bs in range of selected cs
(
  node.b(around.c_near_a_near_b:` +
        distance +
        `);
  way.b(around.c_near_a_near_b:` +
        distance +
        `);
  rel.b(around.c_near_a_near_b:` +
        distance +
        `);
)->.b_near_c_near_a_near_b;


// print
(.c_near_a_near_b; .a_near_c_near_a_near_b; .b_near_c_near_a_near_b;);
out geom meta;
    `
    );

    callback(null, query_parts.join("\n"));
  });
};

export default abc;
