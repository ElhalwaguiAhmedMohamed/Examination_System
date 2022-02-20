--student table stored procedures--

--select--

create procedure SelectAllStudents
as
select * from Student


create procedure SelectStudentsByCity @city varchar(20)
as
select * from Student s where s.std_Address = @city

create proc SelectStudentByName @name varchar(20)
as
select * from Student s where s.std_Name=@name


--insert--
create procedure InsertIntoStudent @id int , @name varchar(20) , @phone varchar(20) , @address varchar(20) , @dept_id int
as
begin
set NOCOUNT ON
insert into Student (std_ID,std_Name,std_Phone,std_Address,dept_ID)
values (@id,@name,@phone,@address,@dept_id)
end

--delete--
create procedure DeleteStudentById @id int
as
begin
SET NOCOUNT ON
delete from student where std_ID = @id
end

create procedure DeleteStudentByName @name varchar(20)
as
begin
SET NOCOUNT ON
delete from student where std_Name = @name
end

--update--
create procedure UpdateStudentById @id int ,@name varchar(20) , @phone varchar(20) , @address varchar(20) , @dept_id int
as 
begin 
update student
set std_Name = @name , std_Address = @address , std_Phone = @phone , dept_ID = @dept_id
where std_ID = @id
end





------------------------------Question------------------------------
--select--

create procedure SelectAllQuestions 
as 
select * from Question

create procedure SelectQuestionById @id int
as
begin
select * from Question where ques_ID = @id
end


create procedure SelectCourseQuestions @c_id int
as
begin 
select * from Question where course_ID = @c_id
end


create procedure SelectQuestionsByType @type varchar(20)
as 
begin
select * from Question where ques_Type = @type
end

--insert----

create procedure InsertQuestion @id int , @body varchar(100) , @grade float , @type varchar(20) , @answer varchar(20) , @c_id int
as 
begin
set nocount on
insert into Question(ques_ID,ques_Body,ques_Grade,ques_Type,ques_ModelAnswer,course_ID)
values(@id , @body ,@grade , @type , @answer , @c_id)
end


--update--
create procedure UpdateQuestionById @id int , @body varchar(100) , @grade float , @type varchar(20) , @answer varchar(20) , @c_id int
as 
begin
set nocount on
update Question
set ques_Body=@body , ques_Grade=@grade , ques_Type=@type , ques_ModelAnswer=@answer , course_ID=@c_id
where ques_ID=@id
end


--delete--
create procedure DeleteQuestionById @id int
as
begin
set nocount on
delete from Question where ques_ID=@id
end


-------------------------choices----------------------
--select--

create procedure SelectAllChoices
as 
select * from Choices

create procedure SelectChoicesForQuestion @q_id int
as 
select * from Choices where ques_ID = @q_id

--insert--
create procedure InsertChoiceForQuestion @q_id int , @choice varchar(20)
as
begin
set nocount on
insert into Choices (ques_ID,choice)
values(@q_id , @choice)
end

--delete--
create proc DeleteChoice @q_id int , @choice varchar(20)
as 
begin
set nocount on
delete from Choices where ques_ID = @q_id AND choice = @choice
end


--update--

create proc UpdateChoice @q_id int , @choice varchar(20)
as
begin
set nocount on
update Choices 
set choice = @choice
where ques_ID=@q_id
end
  


----------Generate Exam----------------

alter proc GenerateExam @c_name varchar(20), @tf_Number int , @multipleChoice_Number int
as
begin
with temp as(

select top (@tf_Number) q.ques_Body , q.ques_ID
from Question q inner join Courses c
on q.course_ID = c.course_ID 
where c.course_Name = @c_name and q.ques_Type like 'True_False'


union all

select top (@multipleChoice_Number)q.ques_Body ,q.ques_ID
from Question q inner join Courses c
on q.course_ID = c.course_ID 
where c.course_Name = @c_name and q.ques_Type like 'choose'

)

select temp.ques_Body , Choices.choice
from temp inner join Choices
on temp.ques_ID = Choices.ques_ID

end


exec GenerateExam @c_name='JavaScript',@tf_Number=4,@multipleChoice_Number=6;