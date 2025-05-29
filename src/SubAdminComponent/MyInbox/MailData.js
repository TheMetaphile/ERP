export const getMailsBySection = (section) => {
    const allMails = {
        inbox: [
            {
                id: 1,
                subject: "Welcome to our new platform!",
                sender: "Sarah Johnson",
                email: "sarah@company.com",
                preview: "We're excited to have you on board. Here's everything you need to know to get started with our amazing platform...",
                time: "2:30 PM",
                unread: true,
                starred: false,
                avatar: "SJ"
            },
            {
                id: 2,
                subject: "Project Update - Q4 Goals",
                sender: "Mike Chen",
                email: "mike@team.com",
                preview: "Here's the latest update on our Q4 objectives. We've made significant progress on the frontend development...",
                time: "1:15 PM",
                unread: true,
                starred: true,
                avatar: "MC"
            },
            {
                id: 3,
                subject: "Invoice #2024-001",
                sender: "Billing Team",
                email: "billing@service.com",
                preview: "Your monthly subscription invoice is ready. Thank you for being a valued customer...",
                time: "12:45 PM",
                unread: false,
                starred: false,
                avatar: "BT"
            }
        ],
        sent: [
            {
                id: 101,
                subject: "Re: Meeting Tomorrow",
                sender: "You",
                email: "you@company.com",
                preview: "Thank you for confirming the meeting. I'll prepare the presentation and send it over before tomorrow...",
                time: "3:45 PM",
                unread: false,
                starred: false,
                avatar: "YO"
            },
            {
                id: 102,
                subject: "Budget Proposal Submission",
                sender: "You",
                email: "you@company.com",
                preview: "Please find attached the budget proposal for the next quarter. I've included detailed breakdowns...",
                time: "2:20 PM",
                unread: false,
                starred: true,
                avatar: "YO"
            }
        ],
        starred: [
            {
                id: 2,
                subject: "Project Update - Q4 Goals",
                sender: "Mike Chen",
                email: "mike@team.com",
                preview: "Here's the latest update on our Q4 objectives. We've made significant progress on the frontend development...",
                time: "1:15 PM",
                unread: true,
                starred: true,
                avatar: "MC"
            },
            {
                id: 4,
                subject: "Weekend Team Building Event",
                sender: "HR Department",
                email: "hr@company.com",
                preview: "Join us for a fun weekend team building event at the park. Food, games, and great company await...",
                time: "11:30 AM",
                unread: false,
                starred: true,
                avatar: "HR"
            }
        ],
        drafts: [
            {
                id: 201,
                subject: "Draft: Quarterly Report",
                sender: "You",
                email: "you@company.com",
                preview: "This is a draft of the quarterly report that needs to be completed and sent to the board...",
                time: "Draft",
                unread: false,
                starred: false,
                avatar: "YO"
            }
        ],
        trash: [
            {
                id: 301,
                subject: "Old Newsletter",
                sender: "Marketing Team",
                email: "marketing@company.com",
                preview: "This is an old newsletter that was moved to trash...",
                time: "Yesterday",
                unread: false,
                starred: false,
                avatar: "MT"
            }
        ],
        spam: [
            {
                id: 401,
                subject: "Congratulations! You've won!",
                sender: "Suspicious Sender",
                email: "spam@suspicious.com",
                preview: "You've won a million dollars! Click here to claim your prize...",
                time: "2 days ago",
                unread: true,
                starred: false,
                avatar: "SS"
            }
        ]
    };

    return allMails[section] || [];
};

export const getSectionTitle = (section) => {
    const titles = {
        inbox: 'Inbox',
        sent: 'Sent',
        starred: 'Starred',
        drafts: 'Drafts',
        trash: 'Trash',
        spam: 'Spam'
    };
    return titles[section] || 'Inbox';
};