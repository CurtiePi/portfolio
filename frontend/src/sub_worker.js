import store from './store/index'

self.addEventListener('push', ev => {
  console.log('Loading service worker!')
  const data = ev.data.json();
  console.log('Got push', data);
  // var value = store.getters.isAuth
  // console.log(`Store data: ${value}`)
  self.registration.showNotification(data.title, {
     body: 'Hello, Zhengzhou!'
  });
});
