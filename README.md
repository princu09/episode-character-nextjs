### Project Overview

This project is built using Next.js with NextUI CLI. The initial page integrates the Rick and Morty API to display all characters, utilizing server-side pagination for data loading. When data is loaded on the first page, the character data is stored in a Zustand store for quick access.

When a user navigates to a different episode page, the system first checks if the character data is already stored in the Zustand store. If the data exists, no additional API call is made. For characters not in the store, the API is called to retrieve and store that data for future use.

Currently, Zustand is used for data management due to time constraints, but it can easily be replaced with a Redis cache in the future. This setup enhances the user experience by speeding up the web application, reducing server load, and saving bandwidth.

### Project Setup

To set up the project locally, follow these steps:

1. Install Node.js: Download and install the latest LTS version of Node.js from Node.js Official Website.

<br/>

2. Navigate to Project Directory: Open your terminal and go to the project directory:

```
cd /project/
```

<br/>

3. Install Dependencies: Run the following command to install all necessary packages:

```
npm install
```

<br/>

4. Run Development Server: Start the development server with:
```
npm run dev
```

5.	Access the App: Open your browser and navigate to http://localhost:3000. If port 3000 is already in use, the app will automatically run on another available port. Check the terminal for the correct port.
