import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    user: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 286; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.increment(),
    userName:Mock.Random.increment(),
    name: Mock.Random.cname(),
    password: Mock.Random.guid(),
    role: Mock.Random.integer(0, 1, 2),
    startDate: Mock.Random.date() ,
    endDate: Mock.Random.date(),
    status: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
