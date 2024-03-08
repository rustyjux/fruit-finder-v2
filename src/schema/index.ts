import * as z from 'zod';

export const NewTreeSchema = z.object({
    latitude: z
    .coerce.number()
    .min(-90, { message: 'Latitude must be greater than or equal to -90' })
    .max(90, { message: 'Latitude must be less than or equal to 90' }),

    longitude: z
    .coerce.number()
    .min(-180, { message: 'Longitude must be greater than or equal to -180' })
    .max(180, { message: 'Longitude must be less than or equal to 180' }),

    type: z.string({
        required_error: "Please select a type of tree"
    }),

    treeCount: z.coerce.number(),
    access: z.string(),
    notes: z.string().optional()
})