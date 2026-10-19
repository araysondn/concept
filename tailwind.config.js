export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'system-ui', 'sans-serif'],
      },
      colors: {
        // CIC Group palette, sampled from the CIC logo (red #AC232D, yellow #FEBE10)
        cic: {
          burgundy: '#AC232D',
          wine: '#86191F',
          berry: '#C42F39',
          red: '#AC232D',
          pink: '#D8505A',
          rose: '#E0646C',
          blush: '#EC8C92',
          orange: '#AC232D',
          amber: '#FEBE10',
          green: '#2E9E3E',
          ink: '#333333',
          muted: '#5F5F5F',
          line: '#DCDCDC',
          mist: '#F6F6F6',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.12)',
      },
    },
  },
}
