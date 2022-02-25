const users = [
    {user_name: 'Marcel'},
    {user_name: 'Victoria'}
]

const roles = [
    {role_name: 'User'},
    {role_name: 'Developer'}
]

const posts = [
    {post_content: 'This website is okay...', user_id: 1},
    {post_content: 'What migration am i in?', user_id: 1},
    {post_content: 'Wow pretty bad website here bud', user_id: 2},
    {post_content: 'What do you want for dinner?', user_id: 1},
    {post_content: 'I would like some Mac n Cheese and Steak Well done', user_id: 2},
    {post_content: 'I would also like some apple juice with ice and a metal straw', user_id: 2},
]


exports.seed = async function(knex) { 
    await knex('roles').insert(roles)
    await knex('users').insert(users)
    await knex('posts').insert(posts)
}