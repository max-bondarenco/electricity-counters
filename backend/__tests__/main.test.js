import { server } from '../server.js'
import Counter from '../models/counter.model.js'
import request from 'supertest'

let testCounter, prev

describe('POST /api/counters', () => {
    beforeAll(async () => {
        await Counter.findOneAndDelete({ name: 'TEST' })

        testCounter = await Counter.create({
            name: 'TEST',
            tariff_day: 120,
            tariff_night: 80,
            penalty_day: 100,
            penalty_night: 50,
        })

        prev = {
            energy_day: 0,
            energy_night: 0,
        }
    })

    describe('Adding readings to new counter', () => {
        test('Should successfully add readings to new counter', async () => {
            const data = {
                counter_id: testCounter._id,
                energy_day: 50,
                energy_night: 30,
            }

            const response = await request(server)
                .post('/api/readings')
                .send(data)

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty('status')
            expect(response.body.status).toBe('success')
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toMatchObject({
                counter_id: `${testCounter._id}`,
                energy_day: data.energy_day,
                energy_night: data.energy_night,
                to_pay:
                    data.energy_day * testCounter.tariff_day +
                    data.energy_night * testCounter.tariff_night,
            })

            prev = response.body.data
        })
    })

    describe('Adding readings to old counter', () => {
        test('Should successfully add readings to old counter', async () => {
            const data = {
                counter_id: testCounter._id,
                energy_day: 100,
                energy_night: 80,
            }

            const response = await request(server)
                .post('/api/readings')
                .send(data)

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty('status')
            expect(response.body.status).toBe('success')
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toMatchObject({
                counter_id: `${testCounter._id}`,
                energy_day: data.energy_day,
                energy_night: data.energy_night,
                to_pay:
                    (data.energy_day - prev.energy_day) *
                        testCounter.tariff_day +
                    (data.energy_night - prev.energy_night) *
                        testCounter.tariff_night,
            })

            prev = response.body.data
        })
    })

    describe('Adding readings with wrong day value', () => {
        test('Should successfully apply penalty to wrong day data', async () => {
            const data = {
                counter_id: testCounter._id,
                energy_day: 80,
                energy_night: 100,
            }

            const response = await request(server)
                .post('/api/readings')
                .send(data)

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty('status')
            expect(response.body.status).toBe('success')
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toMatchObject({
                counter_id: `${testCounter._id}`,
                energy_day: prev.energy_day + testCounter.penalty_day,
                energy_night: data.energy_night,
                to_pay:
                    testCounter.penalty_day * testCounter.tariff_day +
                    (data.energy_night - prev.energy_night) *
                        testCounter.tariff_night,
            })

            prev = response.body.data
        })
    })

    describe('Adding readings with wrong night value', () => {
        test('Should successfully apply penalty to wrong night data', async () => {
            const data = {
                counter_id: testCounter._id,
                energy_day: 220,
                energy_night: 80,
            }

            const response = await request(server)
                .post('/api/readings')
                .send(data)

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty('status')
            expect(response.body.status).toBe('success')
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toMatchObject({
                counter_id: `${testCounter._id}`,
                energy_day: data.energy_day,
                energy_night: prev.energy_night + testCounter.penalty_night,
                to_pay:
                    (data.energy_day - prev.energy_day) *
                        testCounter.tariff_day +
                    testCounter.penalty_night * testCounter.tariff_night,
            })

            prev = response.body.data
        })
    })

    describe('Adding readings with both wrong values', () => {
        test('Should successfully apply penalty to all wrong data', async () => {
            const data = {
                counter_id: testCounter._id,
                energy_day: 80,
                energy_night: 80,
            }

            const response = await request(server)
                .post('/api/readings')
                .send(data)

            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty('status')
            expect(response.body.status).toBe('success')
            expect(response.body).toHaveProperty('data')
            expect(response.body.data).toMatchObject({
                counter_id: `${testCounter._id}`,
                energy_day: prev.energy_day + testCounter.penalty_day,
                energy_night: prev.energy_night + testCounter.penalty_night,
                to_pay:
                    testCounter.penalty_day * testCounter.tariff_day +
                    testCounter.penalty_night * testCounter.tariff_night,
            })

            prev = response.body.data
        })
    })
})
