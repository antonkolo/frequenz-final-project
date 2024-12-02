# FREQUENZ

![FREQUENZ Header](/public/screenshots/Screenshot%202024-11-30%20at%2016.45.23.png)

FREQUENZ is a modern audio sample exchange platform featuring an intuitive, distraction-free interface. It enables musicians, producers, and sound designers to discover, share, and collect high-quality audio samples in a user-friendly environment.

## ✨ Features

- **Browse & Discover**: Explore an extensive library of audio samples with intuitive filtering and categorization
- **User Profiles**: Create your personal profile to showcase your uploads and curate your sample collection
- **Sample Management**:
  - Upload and share your audio creations
  - Download samples for your projects
  - Like and save your favorite samples
  - Organize samples by categories (Drums, Synthesizers, Guitar, Brass, etc.)
- **Playback & Preview**: Built-in waveform visualization and audio playback
- **Authentication**: Secure user authentication with session token protection

## 🛠 Tech Stack

- **Frontend**:

  - React
  - Next.js
  - Styling with modular SCSS
  - Three.js with React Three Fiber & Drei for 3D visuals
  - Web Audio API for sound processing
  - Apollo Client for GraphQL integration
  - Wavesurfer.js for Waveform visualization and playback

- **Backend**:

  - PostgreSQL database
  - GraphQL API
  - Postgres.js for database interactions
  - Ley for database migrations

- **Validation & Security**:

  - Zod for schema validation
  - Session-based authentication

- **File Handling**:
  - UploadThing for media file hosting

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PNPM package manager
- PostgreSQL (v13 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/antonkolo/frequenz-final-project.git
cd frequenz
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up the database:

```sql
psql postgres
CREATE USER frequenz WITH PASSWORD 'your-password';
CREATE DATABASE frequenz WITH OWNER frequenz;
\connect frequenz
```

4. Set up your environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and other configuration.

5. Run database migrations:

```bash
pnpm migrate up
```

6. Generate GraphQL types:

```bash
pnpm generate
```

7. Start the development server:

```bash
pnpm dev
```

## 🗄️ Database Schema

The application uses the following main tables:

- `users`: User accounts and authentication
- `samples`: Audio sample metadata and storage
- `categories`: Sample categorization
- `sample_categories`: Many-to-many relationship between samples and categories
- `sample_likes`: User likes/saves for samples
- `sessions`: User session management

## 🔒 Authentication

The platform implements session-based authentication:

- Sessions are managed through secure cookies
- Session tokens expire after 24 hours
- Protected routes require valid session tokens
- Password hashing using bcrypt

## 🎯 Core Functionality

### Sample Management

- Upload audio files with metadata
- Categorize samples by type (Drums, Synthesizers, etc.)
- Add descriptions and tags
- Download samples

### User Features

- Create and manage profile
- Build personal sample collections
- Like and save favorite samples
- Track uploaded content

## 🖼️ Screenshots

- Landing Page with 3D visualization
- Sample Browser with waveform displays
- User Profile interface
- Upload interface with form

## 🛣️ Roadmap

- [ ] Advanced search functionality
- [ ] Audio effects processing
- [ ] Sample packs and collections
- [ ] User ratings and reviews
- [ ] Social features and sharing

## 🤝 Contributing

Currently in development as a learning project. Feedback and suggestions are welcome!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ About

FREQUENZ is a learning project focused on creating a modern, user-friendly platform for audio sample exchange. It combines contemporary web technologies with audio processing capabilities to deliver a seamless experience for sound enthusiasts.
