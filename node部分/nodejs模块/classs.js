var student = require('./student');
var teacher = require('./teacher');

teacher.add('scott')
function add(teacherName,students) {
    teacher.add(teacherName);
    students.forEach(function (item,index) {
        student.add(item);
    })
}
exports.add = add;  //推荐。传统的对象实例
// module.exports = add; //特别的对象类型