/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export enum deleteImage {
  always = 0,
  never,
  onSuccess,
}

function deleteOriginalFile(deleteType: string) {
  switch (deleteType) {
    case 'true':
      return deleteImage.always;
    case 'false':
      return deleteImage.never;
    default:
      return deleteImage.onSuccess;
  }
}

function paramToArray(param: string | undefined) {
  return typeof param === 'string' ? param.split(',') : undefined;
}

process.env.IMG_SIZES = process.env.IMG_SIZES || '200x200,400x400,600x600';
process.env.DELETE_ORIGINAL_FILE = process.env.DELETE_ORIGINAL_FILE || deleteImage.never.toString();

export default {
  bucket: process.env.IMG_BUCKET,
  cacheControlHeader: process.env.CACHE_CONTROL_HEADER,
  imageSizes: process?.env?.IMG_SIZES?.split(',') || '200x200',
  resizedImagesPath: process.env.RESIZED_IMAGES_PATH,
  includePathList: paramToArray(process.env.INCLUDE_PATH_LIST),
  excludePathList: paramToArray(process.env.EXCLUDE_PATH_LIST),
  deleteOriginalFile: deleteOriginalFile(process.env.DELETE_ORIGINAL_FILE),
  imageTypes: paramToArray(process.env.IMAGE_TYPE),
};
