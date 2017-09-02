# Find out how many todo items are on the list
select count(id) as Todo_Count
from todos;

# Find out how many todo items on the list do not have a valid due date
select count(id) as Todo_With_a_date
from todos 
where due is null;

# Find all the todo items that are marked as done
select * 
from todos 
where done is true;

# Find all the todo items that are not marked as done
select * 
from todos 
where done is not true;

# Get all the todo items, sorted with the most recent first
select * 
from todos 
order by due desc;

# Get the single most recently added todo item
select * 
from todos 
order by due desc limit 1;
# or
select * from todos where id = (select count(id) from todos);

# Get the name and due date of all todo items about 'databases'
select name, due from todos 
where name like '%databases%';

# Get the name and status (as a string) of all todos
select todos.Name as Todo_Name, statuses.Name as Status 
from todos 
inner join statuses on todos.StatusId = statuses.Id;

# Get the name of each status, along with a count of how many todos have that status
select statuses.name as Status, count(todos.StatusId) as Count 
from todos 
join statuses on todos.StatusId = statuses.id 
group by statuses.name ;


# Get the names of all statuses, sorted by most todos with that status to least
select statuses.name as Status, count(todos.StatusId) as Count 
from todos 
join statuses on todos.StatusId = statuses.id 
group by statuses.name 
order by Count desc;

