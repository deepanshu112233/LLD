

// Step 1 — Observer interface
// every subscriber must implement this
// channel only knows this interface — nothing else
interface Observer {
    // called by subject when something changes
    // videoTitle is the data being broadcast
    update(channelName: string, videoTitle: string): void
}

// Step 2 - subject interface
interface Subject{
    subscribe(observer: Observer): void //add subscriber
    unsubscribe(observer: Observer): void //remove subscriber
    notify(videoTitle: string): void // broadcast to all
}

// Step 3 - Concrete subject

class YoutubeChannel implements Subject{
    private channelName: string
    private videoCount: number = 0
    private observers: Observer[] = []
    // stores all subscribers — channel only knows them as Observer
    // doesn't care if they're email, SMS, push, or anything else

    constructor(channelName:string){
        this.channelName=channelName
    }

    subscribe(observer: Observer): void {
        this.observers.push(observer)
        console.log(`New subscriber added to ${this.channelName}`)
    }

    unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs=>obs!==observer)
        console.log(`Subscriber removed from ${this.channelName}`)
    }

    // broadcast to ALL current subscribers
    // channel doesn't call anyone specifically — just loops and calls update()
    notify(videoTitle: string): void {
        this.observers.forEach(observer=>{
            observer.update(this.channelName, videoTitle)
        })
    }

    // when a video is uploaded — trigger notification to all
    uploadVideo(title: string){
        this.videoCount++
        console.log(`\n🎬 [${this.channelName}] uploaded video #${this.videoCount}: "${title}"`)
        console.log(`Notifying ${this.observers.length} subscriber(s)...`)
        this.notify(title)   // ← broadcasts to everyone
    }
    getSubscriberCount(): number {
        return this.observers.length
    }
}


//---------- Different subsriber types -----------
// subscriber who wants email notifications
class EmailSubscriber implements Observer {
    private email: string

    constructor(email: string) {
        this.email = email
    }

    // called automatically when channel uploads
    update(channelName: string, videoTitle: string): void {
        console.log(`   📧 Email → ${this.email}: "${videoTitle}" just dropped on ${channelName}!`)
    }
}

// subscriber who wants SMS notifications
class SMSSubscriber implements Observer {
    private phoneNumber: string

    constructor(phoneNumber: string) {
        this.phoneNumber = phoneNumber
    }

    update(channelName: string, videoTitle: string): void {
        console.log(`   📱 SMS → ${this.phoneNumber}: New from ${channelName} — "${videoTitle}"`)
    }
}


// create the channel (subject)
const tuf      = new YoutubeChannel("TUF")
const tanmayReacts = new YoutubeChannel("Tanmay Reacts")

// create subscribers (observers) with different notification preferences
const depp = new EmailSubscriber("depp@gmail.com")
const alice = new EmailSubscriber("alice@gmail.com")
const bob = new SMSSubscriber("+91-9876543210")

tuf.subscribe(depp)  // Depp wants email notifications from TUF
tuf.subscribe(alice) // Alice wants email notifications from TUF
tuf.subscribe(bob)   // Bob wants SMS notifications from TUF

tanmayReacts.subscribe(alice) // Alice also wants email notifications from Tanmay Reacts

// upload videos — subscribers get notified automatically
tuf.uploadVideo("Observer Pattern Explained")
tanmayReacts.uploadVideo("Best Reacts of 2024")

// Alice unsubscribes from TUF
tuf.unsubscribe(alice)
tuf.uploadVideo("Strategy Pattern in Real Life") // Alice won't get this one
