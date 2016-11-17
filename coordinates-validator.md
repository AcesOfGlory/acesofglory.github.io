---
layout: page
subtitle: Coordinates Validator
---




<script>
  (function isValidCoordinates(coordinates){
    console.log(/^-?0*(([1-8]?\d)(\.\d*)?|90(\.0*)?), -?0*(([1-9]?\d|1[0-7]\d)(\.\d*)?|180(\.0*)?)$/.test(coordinates));
  })("123.123")
</script>


<div class="form-group has-feedback">
  <label class="col-xs-3 control-label">IP address</label>
    <div class="col-xs-7">
      <input type="text" class="form-control" name="ip" data-fv-field="ip"><i class="form-control-feedback" data-fv-icon-for="ip" style="display: none;"></i>
        <small class="help-block" data-fv-validator="ip" data-fv-for="ip" data-fv-result="NOT_VALIDATED" style="display: none;">Please enter a valid IP address</small></div>
</div>
