import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      },
      {
        // Block OpenAI's training bot
        userAgent: 'GPTBot',
        disallow: '/'
      },
      {
        // Block Anthropic's training bot
        userAgent: 'ClaudeBot',
        disallow: '/'
      },
      {
        // Allow OpenAI's search bot
        userAgent: 'OAI-SearchBot',
        allow: '/'
      },
      {
        // Allow Anthropic's search bot
        userAgent: 'Claude-SearchBot',
        allow: '/'
      },
      {
        // Allow user-initiated requests (though robots.txt doesn't apply to these)
        userAgent: 'ChatGPT-User',
        allow: '/'
      },
      {
        // Allow user-initiated requests (though robots.txt doesn't apply to these)
        userAgent: 'Claude-User',
        allow: '/'
      }
    ]
  };
}
