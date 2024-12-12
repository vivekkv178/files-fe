# Welcome to My-Files Application!

![Placeholder Image](https://raw.githubusercontent.com/vivekkv178/cdn/main/files/Thumbnail.png)

Looking for a streamlined solution to securely upload, process, and manage files? **My-Files** is designed to simplify file management by combining modern technology with a user-friendly interface. This application ensures secure uploads, efficient data processing, and powerful search capabilities—all with seamless integration.

---

**Key Features:**

1.  **Secure File Uploads:** Upload your files securely to AWS S3 with dynamically generated pre-signed URLs, ensuring data integrity and safety.
2.  **Dynamic File Processing:** Automatically process uploaded files, parse CSV data, and store it efficiently in MongoDB for easy access and management.
3.  **Data Exploration:**

    - View file data dynamically with **server-side pagination** for a smooth user experience.
    - Search and filter data efficiently with an integrated **AG Grid** on the frontend.

4.  **User-Specific Management:** Each user can manage their own files, ensuring privacy and customization:

    - View all uploaded files.
    - Search and filter file data seamlessly.

---

This platform is built for security, scalability, and performance, making it ideal for managing large datasets and enabling powerful file management capabilities for your users.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (version 20 or higher)
- npm (Node package manager)
- Git

### Installation

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/vivekkv178/files-fe.git
    cd files-fe

    ```

2.  **Install Dependencies:**

    ```bash
    npm install

    ```

3.  **.npmrc File (Only if Step 2 fails)**

    To install the component library, create a `.npmrc` file in the root of your project with the following content:

    > **Important:** The component library is private for now. To access it, you will need a temporary token. Please contact me to obtain the temporary token.

    ```plaintext
    registry=https://registry.npmjs.org/
    @vivekkv178:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=YOUR_TEMPORARY_TOKEN
    ```

### Configuration

Make sure to set up your environment variables. Create a `.env` file in the root of your project and add the necessary configurations.

#### Frontend Environment Variables

> **Note:** The Firebase environment variables are used to perform authentication for the user. A simple firebase project credentials will be enough to get started.

```plaintext
NEXT_PUBLIC_STORYBOOK_URL=https://main--<projectid>.chromatic.com/
NEXT_PUBLIC_CDN_PATH=https://raw.githubusercontent.com/vivekkv178/cdn/main
NEXT_PUBLIC_RBAC_BE_URL=http://localhost:3001
NEXT_PUBLIC_FIREBASE_API_KEY=test
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=test
NEXT_PUBLIC_FIREBASE_APP_ID=test
```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view your application.

---

**Start using My-Files today and unlock effortless file management for your applications!**
