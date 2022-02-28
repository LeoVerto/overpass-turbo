var abc = {};
var abcQuery;

abc.construct_query = function (features, distance, comment, callback) {
  var query_parts = [];

  query_parts.push("/*");
  query_parts.push(
    "This has been generated by the overpass-turbo ABC search wizard."
  );
  query_parts.push("*/");

  (function (x) {
    x(null);
  })(function (abcQuery) {
    query_parts.push(
      "[out:json][bbox:{{bbox}}][timeout:800]; \n\
\n\
// get set of as\n\
(\n\
  node[" +
        features[0] +
        "]({{bbox}});\n\
  way[" +
        features[0] +
        "]({{bbox}});\n\
  rel[" +
        features[0] +
        "]({{bbox}});\n\
)->.a;\n\
\n\
// get set of bs\n\
(\n\
  node[" +
        features[1] +
        "]({{bbox}});\n\
  way[" +
        features[1] +
        "]({{bbox}});\n\
  rel[" +
        features[1] +
        "]({{bbox}});\n\
)->.b;\n\
\n\
// get set of cs\n\
(\n\
  node[" +
        features[2] +
        "]({{bbox}});\n\
  way[" +
        features[2] +
        "]({{bbox}});\n\
  rel[" +
        features[2] +
        "]({{bbox}});\n\
)->.c;\n\
\n\
// determine set of as near bs\n\
(\n\
  node.a(around.b:" +
        distance +
        ");\n\
  way.a(around.b:" +
        distance +
        ");\n\
  rel.a(around.b:" +
        distance +
        ");\n\
)->.a_near_b;\n\
\n\
// determine set of cs near as near bs\n\
(\n\
  node.c(around.a_near_b:" +
        distance +
        ");\n\
  way.c(around.a_near_b:" +
        distance +
        ");\n\
  rel.c(around.a_near_b:" +
        distance +
        ");\n\
)->.c_near_a_near_b;\n\
\n\
// determine set of cs near as near bs\n\
(\n\
  node.c(around.a_near_b:" +
        distance +
        ");\n\
  way.c(around.a_near_b:" +
        distance +
        ");\n\
  rel.c(around.a_near_b:" +
        distance +
        ");\n\
)->.c_near_a_near_b;\n\
\n\
// determine set of as in range of selected cs\n\
(\n\
  node.a(around.c_near_a_near_b:" +
        distance +
        ");\n\
  way.a(around.c_near_a_near_b:" +
        distance +
        ");\n\
  rel.a(around.c_near_a_near_b:" +
        distance +
        ");\n\
)->.a_near_c_near_a_near_b;\n\
\n\
// determine set of bs in range of selected cs\n\
(\n\
  node.b(around.c_near_a_near_b:" +
        distance +
        ");\n\
  way.b(around.c_near_a_near_b:" +
        distance +
        ");\n\
  rel.b(around.c_near_a_near_b:" +
        distance +
        ");\n\
)->.b_near_c_near_a_near_b;\n\
\n\
\n\
// print\n\
(.c_near_a_near_b; .a_near_c_near_a_near_b; .b_near_c_near_a_near_b;);\n\
out geom meta;\n\
    "
    );

    callback(null, query_parts.join("\n"));
  });
};

export default abc;
