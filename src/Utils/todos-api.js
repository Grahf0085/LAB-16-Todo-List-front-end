import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('/api/auth/signup')
    //superagent considers 400 errors

    .ok(res => res.status < 500)
    .send(credentials);

  //re-throw any bad request
  if (response.status === 400) {
    throw response.body;

  }

  return response.body;

}

export async function signIn(credentials) {
  const response = await request
    .post('api/auth/signin')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function addTodo(todo) {
  const response = await request
    .post('api/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send((todo));

  return response.body;
}


export async function getTodos() {
  const response = await request
    .get('api/me/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function deleteTodo(id) {
  const response = await request
    .delete(`/api/todos/${id}`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}


export async function completeTodo(id) {
  const response = await request
    .post(`/ai/todos/${id}/complete`)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}



