import m2i from '../src'

import fs from 'fs/promises'
import path from 'path'

test('m2i', async () => {
  const output = await m2i(path.join(__dirname, 'fixtures.md'))

  expect(output).toBe(path.join(__dirname, 'fixtures.png'))

  const stat = await fs.stat(output)

  expect(stat.size).toBe(10951)
})

test('m2i:options', async () => {
  const output = await m2i(path.join(__dirname, 'fixtures.md'), {
    output: path.join(__dirname, 'output.png'),
    width: 100,
    scale: 1
  })

  expect(output).toBe(path.join(__dirname, 'output.png'))

  const stat = await fs.stat(output)

  expect(stat.size).toBe(5631)
})

test('m2i:exception1', async () => {
  const input = 'm2i' + Date.now().toString()
  try {
    await m2i(input)
  } catch (e) {
    expect(e.message).toBe(`The specified input does not exist: ${input}`)
  }
})

test('m2i:exception2', async () => {
  const input = __dirname
  try {
    await m2i(input)
  } catch (e) {
    expect(e.message).toBe(`The specified input is not a file: ${input}`)
  }
})
