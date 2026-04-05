// ❌ YouTubeChannel knows about every specific subscriber personally
// has to call each one manually — tightly coupled

class EmailService {
    sendEmail(subscriber: string, video: string): void {
        console.log(`📧 Email to ${subscriber}: New video — "${video}"`)
    }
}

class SMSService {
    sendSMS(subscriber: string, video: string): void {
        console.log(`📱 SMS to ${subscriber}: New video — "${video}"`)
    }
}

class PushNotificationService {
    sendPush(subscriber: string, video: string): void {
        console.log(`🔔 Push to ${subscriber}: New video — "${video}"`)
    }
}

class YouTubeChannel {
    private channelName: string
    private emailService: EmailService
    private smsService: SMSService
    private pushService: PushNotificationService

    // ❌ channel is hardwired to every notification type
    // adding a new notification type = modify this class
    constructor(name: string) {
        this.channelName  = name
        this.emailService = new EmailService()
        this.smsService   = new SMSService()
        this.pushService  = new PushNotificationService()
    }

    uploadVideo(title: string): void {
        console.log(`\n🎬 ${this.channelName} uploaded: "${title}"`)

        // ❌ hardcoded subscribers — what if list grows to 1000?
        // ❌ what if someone unsubs? modify this method
        // ❌ what if we add WhatsApp notifications? modify this method
        this.emailService.sendEmail("user1", title)
        this.emailService.sendEmail("user2", title)
        this.smsService.sendSMS("user3", title)
        this.pushService.sendPush("user1", title)
        this.pushService.sendPush("user4", title)
    }
}

// problems:
// 1. channel knows every subscriber personally — tight coupling
// 2. adding new subscriber type = modify YouTubeChannel
// 3. unsubscribe = modify YouTubeChannel
// 4. can't reuse notification logic elsewhere
// 5. impossible to test in isolation