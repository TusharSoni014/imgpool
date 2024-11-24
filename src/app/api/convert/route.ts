import { NextResponse } from "next/server";
import sharp from "sharp";

interface RequestBody {
  targetFormat: string;
  base64Image: string;
  quality?: number;
}

const supportedFormats = [
  "heic",
  "heif",
  "avif",
  "jpeg",
  "jpg",
  "jpe",
  "tile",
  "dz",
  "png",
  "raw",
  "tiff",
  "tif",
  "webp",
  "gif",
  "jp2",
  "jpx",
  "j2k",
  "j2c",
  "jxl",
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export async function POST(request: Request) {
  try {
    const {
      targetFormat,
      base64Image,
      quality = 80,
    } = (await request.json()) as RequestBody;

    if (!base64Image.includes("base64,")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid base64 image format",
        },
        { status: 400 }
      );
    }

    const base64Data = base64Image.split("base64,")[1];
    const inputBuffer = Buffer.from(base64Data, "base64");

    // Check if file is too large (>1GB)
    if (inputBuffer.length > 1024 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: "Image too large. Maximum size is 1GB",
        },
        { status: 400 }
      );
    }

    const metadata = await sharp(inputBuffer).metadata();
    if (!metadata.format) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported input image format",
        },
        { status: 400 }
      );
    }

    const convertedBuffer = await sharp(inputBuffer)
      .toFormat(targetFormat.toLowerCase() as keyof sharp.FormatEnum, {
        quality,
      })
      .toBuffer();

    const convertedBase64 = convertedBuffer.toString("base64");

    return NextResponse.json({
      success: true,
      metadata: {
        width: metadata.width,
        height: metadata.height,
        originalSize: formatFileSize(inputBuffer.length),
        convertedSize: formatFileSize(convertedBuffer.length),
        format: targetFormat,
        originalFormat: metadata.format,
      },
      data: `data:image/${targetFormat};base64,${convertedBase64}`,
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Image conversion failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
