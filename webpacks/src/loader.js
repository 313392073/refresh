module.exports = function loader(content,map,meta) {
    var callback = this.async()
    var result = handler(content,map,meta)
    callback(
        null, //err
        result.content, //转换后的内容
        result.map, //转换后的source-map
        result.meta //转换后的AST
    )
}