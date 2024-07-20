// const plugin = require('tailwindcss/plugin');
const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
      fontFamily: {mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']},
      extend: {
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'shrink': 'shrink 0.5s linear',
          'wiggle': 'wiggle 1s ease-in-out infinite',
          'fadeInUp': 'fadeInUp 0.3s ease-in-out',
          'notification': 'notification 2s linear',
          'progressBar': 'progressBar 2s linear'
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
          },
          shrink: {
            '0%': { transform: 'scale(1)' },
            '1%': { transform: 'scale(0.6)' },
            '99%': { transform: 'scale(0.6)' },
            '100%': { transform: 'scale(1)' },
          },
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          notification: {
            '0%': { opacity: '0', scale: '0' },
            '5%': { opacity: '0.25', scale: '0.5' },
            '10%': { opacity: '1', scale: '1' },
            '90%': { opacity: '1', scale: '1' },
            '95%': { opacity: '0.25', scale: '0.5' },
            '100%': { opacity: '0', scale: '0' },
          },
          progressBar: {
            '0%': { width: '0%' },
            '50%': { width: '50%' },
            '100%': { width: '100%' }
          }
        }
      },
    },
    plugins: [
      // plugin(function({ addVariant }) {
      //   addVariant('first', '&:nth-child(1)'),
      //   addVariant('second', '&:nth-child(2)'),
      //   addVariant('third', '&:nth-child(3)')
      // })
    ],
}