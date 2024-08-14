import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import html from '@rollup/plugin-html'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

import fs from 'fs'

const isProd = process.env.NODE_ENV === 'production'
const extensions = ['.js', '.html']

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      'preventAssignment': true
    }),
    builtins({crypto: false}),
    resolve({
      extensions,
      preferBuiltins: true,
      browser: true
    }),
    commonjs(),
    html({
      fileName: 'index.html',
      template: _ => {
        return fs.readFileSync("src/index.html", "utf-8")
      },
    }),
    (isProd && terser({
      "ecma": "2017"
    })),
    (!isProd && serve({
      host: 'localhost',
      port: 3000,
      contentBase: ['dist']
    })),
    (!isProd && livereload({
      watch: 'dist'
    }))
  ]
}
