import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(userId: string) {
    return jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
}
export function verifyToken(token: string) {
    try {
        console.log("JWT_SECRET:", JWT_SECRET);

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        console.log("DECODED:", decoded);

        return decoded as {
            userId: string;
        };
    } catch (error) {
        console.error(
            "VERIFY TOKEN ERROR:",
            error
        );

        return null;
    }
}