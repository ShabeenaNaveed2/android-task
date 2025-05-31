import axios from 'axios';
const loginUrl = 'https://api.baubuddy.de/index.php/login';
const taskUrl = 'https://api.baubuddy.de/dev/index.php/v1/tasks/select';

export const fetchAccessToken = async (): Promise<string> => {
  const response = await axios.post(
    loginUrl,
    { username: '365', password: '1' },
    {
      headers: {
        'Authorization': 'Basic QVBJX0V4cGxvcmVyOjEyMzQ1NmlzQUxhbWVQYXNz',
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.oauth.access_token;
};

export const fetchTasks = async (token: string) => {
  const response = await axios.get(taskUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
