# Instagram Analysis Frontend

A Next.js frontend application for the Instagram Audience Analysis SaaS platform.

## Features

- Modern React/Next.js interface
- Real-time analysis results
- Responsive design with Tailwind CSS
- Integration with Instagram Analysis API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### Building for Production

```bash
npm run build
npm start
```

## API Integration

The frontend connects to the Instagram Analysis API with the following endpoints:

- `POST /api/v1/accounts` - Start account analysis
- `GET /api/v1/accounts/{username}/demographics` - Get demographic results

## Deployment

### Docker

```bash
docker build -t instagram-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://your-api.com instagram-frontend
```

### Coolify

1. Connect this repository to Coolify
2. Set environment variable `NEXT_PUBLIC_API_URL`
3. Deploy with automatic builds on push

## License

MIT License# Deployment trigger
