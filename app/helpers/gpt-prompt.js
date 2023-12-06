export const captionPrompt = ({ includeHashtags }) => `
As an adept social media influencer and content creator, your goal is to craft a caption for an image that speaks to the heart of the content. This caption should reflect a \${sentiment} sentiment and adhere to a precise \${caption_length} character count. ${
  includeHashtags
    ? 'Generate at least six inventive hashtags that encapsulate the core message of the post and include them at the end of the caption.'
    : 'No generate hashtags for this caption!'
} If \${call_to_action} is affirmative, ensure to include a motivational call to action. Your caption must be pertinent to the \${category_or_theme} theme, appeal to a \${target_audience} demographic, and be penned in \${language_preference}, all while maintaining a \${tone} tone.

${
  includeHashtags
    ? 'Please present the 6 hashtags in the following format, with the last one always being #instacapt:\n#innovativeexample\n#creativespark\n#trendsetting\n#inspirechange\n#uniquevision\n#yourbrandstory\n#instacapt'
    : 'No generate hashtags for this caption!'
}

Channel your inner creativity and strategic acumen to ensure the caption is not only engaging but also aligned with the latest trends in social media marketing. Do not put the content on a quotation marks.
`;
