import InformationService from '@/services/InformationService'

export default class Subscriber{

  constructor (navigator) {
      this.navigator = navigator
      this.publicVapidKey = 'BOSBvEGFbEIgOdFeq5ue_GWgyKU6p1rnohaYz6xUQA6k5VYWSXzs2yKakVErjvRQ0eO5WLg85uirHCI9QyjkQ7c'
  }

  subscribe () {
    if ('serviceWorker' in this.navigator) {
      this.run().catch(error => console.error(error));
    } else {
      console.log('Unable to register the service worker')
    }
  }

  async run() {
    console.log('Registering service worker')

    const registration = await this.navigator.serviceWorker.register('./sub_worker.js', { scope: '/' })
    console.log('Registered service worker')

    console.log('Registering push')
    const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(this.publicVapidKey)
      })
    console.log('Registered push')

    console.log('Sending push')
    await InformationService.subscribe({
        data: JSON.stringify(subscription)
    })
    console.log('Sent push')
  }

  /**
   * urlBase64ToUint8Array
   *
   * @param {string} base64String a public vavid key
   */
  urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
