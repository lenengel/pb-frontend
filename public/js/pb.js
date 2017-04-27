 /**
 * ServicePortal
 *
 * ServicePortal supporting js functions
 *
 */

if (typeof PORTAL === "undefined")
  {
  var PORTAL = {};

  //----------------------------------------------------------------------------------------------------
  // check device sn
  //----------------------------------------------------------------------------------------------------
  PORTAL.sn = {
    isValid: function (options, onValidSn)
      {
      var sn = (options.sn).replace(/\s/g, "").toLowerCase();

      if (sn.length == 0)
        return onValidSn ("SN is empty");

      rm.open (PORTAL.Authorization.string, PORTAL.Authorization.host);

      rm.call (
        "GET", "1/devices/" + sn + "/cv-master", {}, function (status)
        {
        if (status != 200)
          return onValidSn ("SN is'nt valid");
        onValidSn (null);
        });
      }
  };

  //----------------------------------------------------------------------------------------------------
  // filter methods
  //----------------------------------------------------------------------------------------------------
  PORTAL.filter = {
    led: function ( options )
      {
      switch ($(options.element).data('value'))
      {
        case 'gray' :
          changeTo('ok');
          break;
        case 'ok' :
          changeTo('warning');
          break;
        case 'warning' :
          changeTo('critical');
          break;
        case 'critical' :
        default:
          changeTo('gray');
          break;
      }

      function changeTo(color)
        {
        $(options.element).removeClass();
        $(options.element).addClass('led led-' + color);
        $(options.element).data('value', color);

        // get current filter string
        var filter = options.table.search();
        filter = filter.replace('gray', '');
        filter = filter.replace('ok', '');
        filter = filter.replace('critical', '');
        filter = filter.replace('warning', '');

        // add current filter to led status
        options.table.search((color == 'gray') ? filter : color + filter).draw();
        }
      }
  };

  //----------------------------------------------------------------------------------------------------
  // modal window
  //----------------------------------------------------------------------------------------------------
  PORTAL.modal = {
    editText: function (element, onHide)
      {
      var data = $ (element).data();
      BootstrapDialog.show(
        {
          title: '',
          message: '<input id="modal-text" maxlength="250" ' + ((!data.value.length && data.hasOwnProperty('placeholder')) ? 'placeholder="' + data.placeholder + '" ' : '') + 'value="' + data.value + '" class="form-control">',
          type: BootstrapDialog.TYPE_DEFAULT,
          onhide: function (dialog)
            {
            data.value = dialog.getModalBody().find('input').val();
            onHide (data);
            }
        });
      },
    progressBar: function (options)
      {
      BootstrapDialog.show(
        {
          title: options.title,
          message: '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>',
          closable: false,
          type: BootstrapDialog.TYPE_DEFAULT
        });
      },
    closeAll: function ()
      {
      BootstrapDialog.closeAll();
      },
    common: function (options)
      {
      options["type"] = BootstrapDialog.TYPE_DEFAULT;
      options["buttons"] = [{
        label: language.CLOSE,
        action: function (dialog)
          {
          dialog.close();
          }
      }];
      BootstrapDialog.show(options);
      },
    extendContract: function (options)
      {
      var contract = PORTAL.contract.getById (options);
      var extendOptions = "";

      for (var period in config.contract.periods)
        extendOptions += "<option value=\"" + period + "\">" + config.contract.periods[period] + "</option>";

      BootstrapDialog.show(
        {
          title: '',
          message: '<select id="contract-period" class="form-control"><option value="none" selected="" disabled="" style="display: none;">' + language.CONTRACT_EXTEND_TO + '</option>' + extendOptions + '</select>',
          type: BootstrapDialog.TYPE_DEFAULT,
          buttons: [{
            label: language.CONTRACT_EXTEND_END,
            action: function (dialog)
              {
              var value = dialog.getModalBody().find('select').val();

              if (!value)
                return dialog.close();

              value = parseInt (contract.data.period) + parseInt (value);

              // extend contract
              rm.call (
                "PUT", "1/groups/" + contract.group.group_id + "/contracts/" + contract.header.UID, {period: value}, function (status)
                {
                if (status == 204)
                  {
                  contract.data.period = value;
                  dialog.close();

                  PORTAL.modal.progressBar({title: ""});
                  PORTAL.contract.getData(
                    function (onData)
                    {
                    if (!onData)
                      {
                      PORTAL.contract.calibration.load({id: contract.header.UID});
                      PORTAL.contract.table.reloadPeriod(
                        {
                          cell: $ ('#contract-table .selected td:eq(3)'),
                          contract: contract
                        });
                      PORTAL.modal.closeAll();
                      }
                    });
                  }
                });
              }
          }]
        });
      },
    endContract: function (options)
      {
      var contract = PORTAL.contract.getById (options);

        /**/

      BootstrapDialog.show(
          {
            title: '',
            message: '<input id="contract-end-date" data-toggle="tooltip" data-placement="auto" data-original-title="' + language.END_CONTRACT_HELP + '" placeholder="' + language.END_AT + '" data-date-format="yyyy-mm-dd" class="form-control">',
            type : BootstrapDialog.TYPE_DEFAULT,
            onshown: function(dialogRef){
              $ ('#contract-end-date').datepicker(
                  {
                    language: 'de',
                    orientation: 'bottom auto',
                    autoclose: true,
                    todayHighlight: true,
                    todayBtn : "linked"
                  });
            },
            buttons: [{
              label: language.END_CONTRACT,
              action: function (dialog)
              {
                var value = dialog.getModalBody().find('input').val();

                if (!value)
                  return dialog.close();

                // end contract
                rm.call (
                    "PUT", "1/groups/" + contract.group.group_id + "/contracts/" + contract.header.UID, {end: value}, function (status)
                    {
                      if (status == 204)
                      {
                        dialog.close();
                        /*
                        PORTAL.modal.progressBar({title: ""});
                        PORTAL.contract.getData(
                            function (onData)
                            {
                              if (!onData)
                              {
                                PORTAL.contract.calibration.load({id: contract.header.UID});
                                PORTAL.contract.table.reloadPeriod(
                                    {
                                      cell: $ ('#contract-table .selected td:eq(3)'),
                                      contract: contract
                                    });
                                PORTAL.modal.closeAll();
                              }
                            });*/
                      }
                    });
              }
            }]
          });
    },
    addInsurance: function (options)
      {
      var contract = PORTAL.contract.getById (options);
      BootstrapDialog.show(
        {
          title: '',
          message: '',
          type: BootstrapDialog.TYPE_DEFAULT,
          buttons: [{
            label: language.INSURANCE_ADD,
            action: function (dialog)
              {
              // save/update email
              rm.call (
                "PUT", "1/groups/" + contract.group.group_id + "/contracts/" + contract.header.UID, {insurance: true}, function (status)
                {
                if (status == 204)
                  {
                  dialog.close();
                  PORTAL.modal.progressBar({title: ""});

                  PORTAL.contract.getData(
                    function (onData)
                    {
                    if (!onData)
                      {
                      PORTAL.contract.calibration.load({id: contract.header.UID});
                      PORTAL.contract.table.reloadInsurance(
                        {
                          cell: $ ('#contract-table .selected td:eq(4)'),
                          insurance: true
                        });
                      PORTAL.modal.closeAll();
                      }
                    });
                  }
                });
              }
          },
            {
              label: language.CANCEL,
              action: function (dialog)
                {
                dialog.close();
                }
            }]
        });
      },
    changeMail: function (options)
      {
      var contract = PORTAL.contract.getById (options);
      BootstrapDialog.show(
        {
          title: '',
          message: '<div class="form-group"><input id="contract-emails-reminder" class="form-control email-tokenfield" type="text" placeholder="' + language.CONTRACT_REMINDER_EMAILS + '" maxlength="250" value="' + contract.data.email.remind + '"></div>' +
          '<div class="form-group"><input id="contract-emails-alarming" class="form-control email-tokenfield" type="text" placeholder="' + language.CONTRACT_ALARMING_EMAILS + '" maxlength="250" value="' + contract.data.email.alarm + '"></div>',
          type: BootstrapDialog.TYPE_DEFAULT,
          onshown: function (dialogRef)
            {
            $ ('.email-tokenfield')
              .on(
                'tokenfield:createdtoken', function (e)
                {
                // e-mail validation
                var re = /\S+@\S+\.\S+/
                var valid = re.test(e.attrs.value)
                if (!valid)
                  {
                  $ (e.relatedTarget).addClass('invalid');
                  }
                }).
            tokenfield({delimiter: [';', ','], createTokensOnBlur: true});
            },
          buttons: [{
            label: language.SAVE,
            action: function (dialog)
              {
              // check email
              if ($ ('.tokenfield > .invalid').length != 0)
                {
                PORTAL.modal.common ({title: language.WARNING, message: language.INVALID_MAIL});
                return false;
                }

              // save/update email
              rm.call (
                "PUT", "1/groups/" + contract.group.group_id + "/contracts/" + contract.header.UID, {
                  email: {
                    remind: $ ('#contract-emails-reminder').val(),
                    alarm: $ ('#contract-emails-alarming').val()
                  }
                }, function (status)
                {
                if (status == 204)
                  {
                  contract.data.email.remind = $ ('#contract-emails-reminder').val();
                  contract.data.email.alarm = $ ('#contract-emails-alarming').val();
                  dialog.close();

                  PORTAL.modal.progressBar({title: ""});

                  PORTAL.contract.getData(
                    function (onData)
                    {
                    if (!onData)
                      {
                      PORTAL.contract.calibration.load({id: contract.header.UID});
                      PORTAL.modal.closeAll();
                      }
                    });
                  }
                });
              }
          }]
        });
      }
  };

  //----------------------------------------------------------------------------------------------------
  // RMA opertations
  //----------------------------------------------------------------------------------------------------
  PORTAL.rma = {
    //----------------------------------------------------------------------------------------------------
    // clear form
    //----------------------------------------------------------------------------------------------------
    clearForm: function ()
      {
      $ ('#rma-sn').val ('');
      $ ('#rma-connection option:first').attr ('selected', 'selected');
      $ ('#rma-sim option:first').attr ('selected', 'selected');
      $ ('#rma-failure-desc').val ('');
      $ ('#rma-accessories-desc').val ('');
      },
    //----------------------------------------------------------------------------------------------------
    // delete serial number of data table
    //----------------------------------------------------------------------------------------------------
    delSn: function (line)
      {
      for (var i = 0; i < PORTAL.rma.data.devices.length; i++)
        {
        // delete object
        if (PORTAL.rma.data.devices[i].sn == $ (line).attr ("sn"))
          {
          $ (line).tooltip ('destroy');
          PORTAL.rma.data.devices.splice (i, 1);
          break;
          }
        }

      // remove line of table
      PORTAL.rma.table["sn"]
        .row ($ (line).parents ('tr'))
        .remove ()
        .draw ();
      },
    //----------------------------------------------------------------------------------------------------
    // show mask: check rma
    //----------------------------------------------------------------------------------------------------
    nextCheckInput: function ()
      {
      // check input
      if (PORTAL.Authorization.groups.length > 1)
        {
        // check group selected
        if (!$ ('#rma-group').val ())
          return PORTAL.modal.common ({title: language.WARNING, message: language.MISSING_FIELD});
        }
      else
        {
        PORTAL.rma.sn.add ();

        // check SN properties
        if (!PORTAL.rma.data.devices.length)
          return PORTAL.modal.common ({title: language.WARNING, message: language.MISSING_FIELD});
        }

      // change wizard
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.rma-step-2' : '.rma-step-1').removeClass ('active');
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.rma-step-3' : '.rma-step-3').removeClass ('disabled');
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.rma-step-2' : '.rma-step-1').addClass ('complete');
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.rma-step-3' : '.rma-step-3').addClass ('active');

      if (PORTAL.Authorization.groups.length > 1)
        {
        // remove hide of sn-list
        $ ('.sn-list').removeClass ('hide');
        }
      else
        {
        // add hide of add-sn
        $ ('.form-group-add-sn').addClass ('hide');
        }

      // remove hide SN button
      $ ('.del-sn').addClass ('hide');

      // add hide SN form group
      $ ('.form-group-add-sn').addClass ('hide');

      // disable group selection
      $ ('#rma-group').attr ("disabled", "disabled");

      // hide buttons
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.btn-group-step-2' : '.btn-group-step-1').addClass ('hide');

      // show save buttons
      $ ('.btn-group-step-3').removeClass ('hide');
      },
    //----------------------------------------------------------------------------------------------------
    // show mask: check rma
    //----------------------------------------------------------------------------------------------------
    nextSelectGroup: function ()
      {
      PORTAL.rma.sn.add ();

      // check SN properties
      if (!PORTAL.rma.data.devices.length)
        return PORTAL.modal.common ({title: language.WARNING, message: language.MISSING_FIELD});

      // change wizard
      $ ('.rma-step-1').removeClass ('active');
      $ ('.rma-step-2').removeClass ('disabled');
      $ ('.rma-step-1').addClass ('complete');
      $ ('.rma-step-2').addClass ('active');

      // hide add-sn
      $ ('.form-group-add-sn').addClass ('hide');
      $ ('.sn-list').addClass ('hide');

      // show group selection
      $ ('.form-group-select-group').removeClass ('hide');

      // hide buttons
      $ ('.btn-group-step-1').addClass ('hide');

      // show save buttons
      $ ('.btn-group-step-2').removeClass ('hide');
      },
    //----------------------------------------------------------------------------------------------------
    // show mask: check rma
    //----------------------------------------------------------------------------------------------------
    backInputSerial: function ()
      {
      // check SN properties
      if (!PORTAL.rma.data.devices.length)
        return PORTAL.modal.common ({title: language.WARNING, message: language.MISSING_FIELD});

      // change wizard
      $ ('.rma-step-2').removeClass ('active');
      $ ('.rma-step-1').removeClass ('disabled');
      $ ('.rma-step-2').addClass ('disabled');
      $ ('.rma-step-1').addClass ('active');

      // remove hide add-sn
      $ ('.form-group-add-sn').removeClass ('hide');
      $ ('.sn-list').removeClass ('hide');
      $ ('.del-sn').removeClass ('hide');

      // hide group selection
      $ ('.form-group-select-group').addClass ('hide');

      // buttons
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.btn-group-step-2' : '.btn-group-step-3').addClass ('hide');
      $ ('.btn-group-step-1').removeClass ('hide');
      },
    //----------------------------------------------------------------------------------------------------
    // show check rma mask
    //----------------------------------------------------------------------------------------------------
    backSelectGroup: function ()
      {
      // change wizard
      $ ('.rma-step-2').addClass ('active');
      $ ('.rma-step-3').addClass ('disabled');
      $ ('.rma-step-2').removeClass ('complete');
      $ ('.rma-step-3').removeClass ('active');

      // show add SN form group
      $ ('.sn-list').addClass ('hide');

      // enable group selection
      $ ('#rma-group').removeAttr ('disabled');

      // buttons
      $ ('.btn-group-step-2').removeClass ('hide');
      $ ('.btn-group-step-3').addClass ('hide');
      },
    //----------------------------------------------------------------------------------------------------
    // load groups
    //----------------------------------------------------------------------------------------------------
    loadGroups: function ()
      {
      if (PORTAL.Authorization.groups.length <= 1)
        {
        $ ('#rma-group').append ($ ("<option selected></option>").attr ("value", PORTAL.Authorization.groups[0].name.toLowerCase ()).text (PORTAL.Authorization.groups[0].name));
        return;
        }

      $ ('#rma-group').parent ().parent ().removeClass ("hidden");
      PORTAL.Authorization.groups.forEach (
        function (group)
        {
        $ ('#rma-group').append ($ ("<option></option>").attr ("value", group.name.toLowerCase ()).text (group.name));
        });
      },
    //----------------------------------------------------------------------------------------------------
    // save rma
    //----------------------------------------------------------------------------------------------------
    save: function ()
      {
      // change wizard
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.rma-step-3' : '.rma-step-3').removeClass ('active');
      $ ('.rma-step-4').removeClass ('disabled');
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.rma-step-3' : '.rma-step-3').addClass ('complete');
      $ ('.rma-step-4').addClass ('complete');

      // set header values
      PORTAL.modal.progressBar ({title: language.RMA_PROCESSING});

      rm.open (PORTAL.Authorization.string, PORTAL.Authorization.host);
      rm.call (
        "POST", "1/groups/" + ((PORTAL.Authorization.groups.length > 1) ? $ ('#rma-group').val () : PORTAL.Authorization.groups[0].name.toLowerCase ()) + "/rma", PORTAL.rma.data, function (status, reply)
        {
        if (status === 200)
          {
          PORTAL.rma.data.header = {};
          PORTAL.rma.data.header.UID = reply.UID;
          PORTAL.rma.data.header.stamp_created = moment.utc().format('YYYY-MM-DD HH:mm:ss');
          PORTAL.rma.data.header.group = (PORTAL.Authorization.groups.length > 1) ? $ ('#rma-group option:selected').text () : PORTAL.Authorization.groups[0].name;

          // start pdf job
          $.post ("/rma/pdf", PORTAL.rma.data).done (
            function (data)
            {
            window.location.href = "/rma/view";
            });
          }
        else if (status === 400)
          PORTAL.modal.common ({title: language.FAILURE, message: reply.err});
        else
          {
          PORTAL.modal.common ({title: language.FAILURE, message: language.RMA_SAVE_STD_FAILURE});
          }
        });
      },
    getGroupById: function (groupId)
      {
      for (var i = 0; i < PORTAL.Authorization.groups.length; i++)
        {
        if (PORTAL.Authorization.groups[i]._uid == groupId)
          {
          return PORTAL.Authorization.groups[i];
          }
        }
      return {};
      }
  };

  PORTAL.rma.process = {
    //----------------------------------------------------------------------------------------------------
    // save Process
    //----------------------------------------------------------------------------------------------------
    save: function (options)
      {
       // save/update notice
       rm.call (
       "POST", "1/rma/" + options.rmaId + "/log", {process: options.value}, function (status)
       {
       if (status != 204)
        return;

       $ ('.rma-process[data-rma-id=' + options.rmaId + ']').html ((options.value.length) ? options.value : "<span class='wanly'>" + language.EMPTY + "</span>");
       $ ('.rma-process[data-rma-id=' + options.rmaId + ']').data ('value', options.value);
       $ ('.rma-process[data-rma-id=' + options.rmaId + ']').attr ('data-original-title', options.value);
       });
      }
  };

  PORTAL.rma.table = {
    //----------------------------------------------------------------------------------------------------
    // load rma table
    //----------------------------------------------------------------------------------------------------
    load: function ()
      {
      $ ("#rma-table_processing").show();
      rm.open (PORTAL.Authorization.string, PORTAL.Authorization.host);

      var rmaNumbers = [];
      if (PORTAL.Authorization.groups.length <= 1)
      // set groups invisible, due to user has only 1 group
        PORTAL.rma.table["view"].column (1).visible (false);

      async.each( PORTAL.Authorization.groups, function (group, onGroup)
        {
        rm.call (
          "GET", "1/groups/" + group.group_id + "/rma", {}, function (rmaStatus, rmas)
          {
          if (rmaStatus === 400)
            return onGroup ({ title: language.FAILURE, message: language.ERROR_SERVERGROUP});

          if (rmaStatus === 500)
            return onGroup ({title: language.FAILURE, message: language.ERROR_INTERNAL});

          rmas.data.forEach (
            function (rma)
            {
            var sn = [];
            rma.devices.forEach (
              function (device)
              {
              sn.push (device.sn);
              });

            rmaNumbers.push (rma.header.UID);

            var process = "";
            for (var log in rma.log)
              {
              if (rma.log[log].hasOwnProperty ('process'))
                {
                process = rma.log[log].process;
                break;
                }
              }
            var processHTML = (process.length === 0) ? "<span class='wanly editable'>" + language.EMPTY + "</span>" : process;

            // get duration of each state type
            PORTAL.rma.state.duration (
              {log: rma.log}, function (err, state)
              {
              var rmaState = PORTAL.rma.state.getLedColor (
                {
                  state: state,
                  group: group,
                  checkState: rma.header.state
                });

              PORTAL.rma.table["view"].row.add (
                {
                  "id": "<span id='rma-id' rma-id='" + rma.header.UID + "' group-id='" + group._uid + "'>" + rma.header.UID + "</span>",
                  "group": "<span id='rma-group-id'>" + group.name + "</span>",
                  "status": "<span class='hidden'>" + rmaState + "</span><div class='led " + rmaState + "'></div>" +  language["RMA_STATE_" + rma.header.state.toUpperCase ()],
                  "last-change-stamp": moment.utc(rma.header.stamp, "YYYY-MM-DD HH:mm:ss").local().format("YYYY-MM-DD HH:mm:ss"),
                  "sn": "<span data-toggle='tooltip' data-placement='auto' data-original-title='" + sn.join (', ') + "'>" + sn.join (', ') + "</span>",
                  "process": "<span class='rma-process editable' data-rma-id='" + rma.header.UID + "' data-group-id='" + group.group_id + "' data-value='" + process + "' data-placeholder='" + language.RMA_PROCESS + "' data-toggle='tooltip' data-placement='auto' data-original-title='" + process + "' onclick='PORTAL.modal.editText(this, function (options) { PORTAL.rma.process.save(options);});'>" + processHTML + "</span>"
                });
              });

            });
          onGroup();
          });
        },
        function(errGroup) {
          if(errGroup)
            return PORTAL.modal.common (errGroup);

          $ ('#copy-rma-numbers').attr ('data-clipboard-text', rmaNumbers.join (', '));
          PORTAL.rma.table["view"].draw ();
          $ ("#rma-table_processing").hide();
        });
      },
    //----------------------------------------------------------------------------------------------------
    // clear rma table
    //----------------------------------------------------------------------------------------------------
    clear: function ()
      {
      PORTAL.rma.table["view"].clear ().draw ();
      },
    //----------------------------------------------------------------------------------------------------
    // reload rma table
    //----------------------------------------------------------------------------------------------------
    reload: function ()
      {
      PORTAL.rma.table.clear ();
      PORTAL.rma.table.load ();
      },
    //----------------------------------------------------------------------------------------------------
    // reload state of rma
    //----------------------------------------------------------------------------------------------------
    reloadState: function (options)
      {
      rm.call (
        "GET", "1/groups/" + options.groupId + "/rma/" + options.rmaId, {}, function (status, reply)
        {
        if (status == 200)
          {
          PORTAL.rma.state.duration (
            {log: reply.data.log}, function (err, state)
            {
            options.cell.html (
              "<div class='led " + PORTAL.rma.state.getLedColor (
                {
                  state: state,
                  group: PORTAL.rma.getGroupById (options.groupId),
                  checkState: reply.data.header.state
                }) + "'></div><span id='rma-status'>" + language["RMA_STATE_" + reply.data.header.state.toUpperCase ()] + "</span>");
            });
          }
        });
      }
  };

  PORTAL.rma.sn = {
    //----------------------------------------------------------------------------------------------------
    // add serial number to data table
    //----------------------------------------------------------------------------------------------------
    add: function (showWarning)
      {
      var snAlreadyExist = false;
      var device = {};
      // replace all spaces in sn field
      device.sn = ($ ('#rma-sn').val ()).replace(/\s/g, "");
      device.connection = $ ('#rma-connection').val ();
      device.sim = $ ('#rma-sim').val ();
      device.failureDesc = $ ('#rma-failure-desc').val ();
      device.accessoriesDesc = $ ('#rma-accessories-desc').val ();

      // due to connection state 'not applied', set sim state 'not applied'
      if (device.connection == config.states.connection.nApplied)
        {
        device.sim = config.states.sim.nApplied;
        $ ('#rma-sim').removeAttr ('disabled');
        }

      // remove sn
      $ ('#rma-sn-icon').removeClass("glyphicon-ok");
      $ ('#rma-sn-icon').removeClass("glyphicon-remove");
      $ ('#rma-sn-icon').parent().removeClass("has-success");
      $ ('#rma-sn-icon').parent().removeClass("has-error");

      // check form field's
      if (!device.sn || !device.connection || !device.sim || !device.failureDesc || !device.accessoriesDesc)
        {
        if (showWarning)
          PORTAL.modal.common ({title: language.WARNING, message: language.MISSING_FIELD});
        return;
        }

      // check SN already exist's
      PORTAL.rma.data.devices.forEach (
        function (dev)
        {
        if (dev.sn == device.sn)
          {
          PORTAL.modal.common ({ title: language.WARNING, message: language.SN_ALREADY_EXISTS });
          PORTAL.rma.clearForm ();
          snAlreadyExist = true;
          return;
          }
        });

      if (!snAlreadyExist)
        {
        PORTAL.rma.table["sn"].row.add (
          {
            "delete": "<span class='glyphicon glyphicon-minus pointer del-sn'  data-toggle='tooltip' data-placement='right' data-original-title='" + language.DEL_ENTRY + "' sn='" + device.sn + "'></span>",
            "sn": device.sn,
            "connection": language[device.connection.toUpperCase ()],
            "sim": language[device.sim.toUpperCase ()],
            "failure-desc": device.failureDesc,
            "accessories-desc": device.accessoriesDesc
          }).draw ();

        $ ('.sn-list').removeClass ("hide");

        PORTAL.rma.data.devices.push (device);

        PORTAL.rma.clearForm ();
        }
      },
    isValid: function ()
      {
      PORTAL.sn.isValid(
        {sn: $ ('#rma-sn').val ()}, function (err)
        {
        if (err)
          {
          $ ('#rma-sn-icon').addClass("glyphicon-remove");
          $ ('#rma-sn-icon').parent().addClass("has-error")
          $ ('#rma-sn-icon').removeClass("glyphicon-ok");
          $ ('#rma-sn-icon').parent().removeClass("has-success");
          }
        else {
          $('#rma-sn-icon').addClass("glyphicon-ok");
          $('#rma-sn-icon').parent().addClass("has-success");
          $('#rma-sn-icon').removeClass("glyphicon-remove");
          $('#rma-sn-icon').parent().removeClass("has-error");
          // add information about contract state
          if (PORTAL.contract.data.length) {
            for (var i = 0; i < PORTAL.contract.data.length; i++) {
              $('#rma-sn-icon').data('')
            }
            $('#rma-sn-icon').data('original-title', language.NO_CONTRACT_AVAILABLE)
          }
        }
        });
      }
  };
  
  //----------------------------------------------------------------------------------------------------
  // manage rma attachments
  //----------------------------------------------------------------------------------------------------
  PORTAL.rma.attachment = {
    //----------------------------------------------------------------------------------------------------
    // get attachment
    // @parameters:
    // options.gridID
    //----------------------------------------------------------------------------------------------------
    get: function (options)
      {
      $ ("#download-attachment input[name=rmaId]").val (options.rmaId);
      $ ("#download-attachment input[name=filename]").val (options.filename);
      $ ("#download-attachment").submit ();
      }
  };
  //----------------------------------------------------------------------------------------------------
  // manage rma attachments
  //----------------------------------------------------------------------------------------------------
  PORTAL.cv = {};
  PORTAL.cv.attachment = {
    //----------------------------------------------------------------------------------------------------
    // get attachment
    // @parameters:
    // options.filenmae
    //----------------------------------------------------------------------------------------------------
    get: function (options)
      {
      $ ("#download-attachment input[name=filename]").val (options.filename);
      $ ("#download-attachment input[name=cv]").val (options.cv);
      $ ("#download-attachment input[name=sn]").val (options.sn);
      $ ("#download-attachment").submit ();
      }
  };
  //----------------------------------------------------------------------------------------------------
  // manage rma log entries
  //----------------------------------------------------------------------------------------------------
  PORTAL.rma.log = {
    //----------------------------------------------------------------------------------------------------
    // load log of rma
    //----------------------------------------------------------------------------------------------------
    load: function (options)
      {
      $("#rma-details_processing").show();
      // clear table details
      PORTAL.rma.table["details"].clear ().draw ();

      $ ('.scroll-area-details').removeClass ('hide');
      $ ('.details-rma-nr').html (options.rmaId);

      rm.call (
        "GET", "1/groups/" + options.groupId + "/rma/" + options.rmaId, {}, function (status, reply)
        {
        if (status === 400)
          return PORTAL.modal.common ({ title: language.FAILURE, message: language.ERROR_SERVERGROUP});

        if (status === 500)
          return PORTAL.modal.common ({title: language.FAILURE, message: language.ERROR_INTERNAL});

        PORTAL.rma.table["details"].row.add (
          {
            "delete": "<span class='glyphicon glyphicon-plus pointer text-left add-log' onclick='PORTAL.rma.log.add({rmaId: \"" + options.rmaId + "\", groupId: \"" + options.groupId + "\", state: \"" + reply.data.header.state + "\"});' data-toggle='tooltip' data-placement='right' data-original-title='" + language.ADD_ATTACHEMENT + "'></span>",
            "state": (PORTAL.Authorization.group < 5) ? "<div class='led led-ok text-left', data-toggle='tooltip', data-placement='left', data-original-title='test'></div><span id='rma-log-state' class='text-left' value='" + reply.data.header.state + "'>" + language["RMA_STATE_" + reply.data.header.state.toUpperCase ()] + "</span>" : "<select class='form-control' id='rma-log-state'><option value='" + language.RMA_NEW + "'>" + language.RMA_STATE_NEW + "</option><option value='" + language.RMA_CHECK + "'>" + language.RMA_STATE_CHECK + "</option><option value='" + language.RMA_OFFER + "'>" + language.RMA_STATE_OFFER + "</option><option value='" + language.RMA_PROGRESS + "'>" + language.RMA_STATE_PROGRESS + "</option><option value='" + language.RMA_CLOSED + "'>" + language.RMA_STATE_CLOSED + "</option></select>",
            "date": "<div id='rma-log-stamp' class='text-left'>" + moment().format("YYYY-MM-DD HH:mm:ss") + "</div>",
            "notice": "<input class='form-control' id='rma-log-notice' placeholder='" + language.RMA_NOTICE + "' maxlength='250'>",
            "user": "<div id='rma-log-user' class='text-left'>" + PORTAL.Authorization.user + "</div>",
            "attachment": "<form id='rma-log-attachment-form' enctype='multipart/form-data'><input id='rma-log-attachment-input' type='file' name='file' class='filestyle'></form>"
          }).draw ();

        if (PORTAL.Authorization.group >= 5)
          {
          $ ("#rma-log-state option").each (
            function (i)
            {
            if ($ (this).val () == reply.data.header.state)
              {
              $ ('#rma-log-state').attr ('state', reply.data.header.state);
              $ (this).attr ('selected', 'selected');
              return false;
              }
            else
              {
              $ (this).addClass ('disabled');
              }
            });
          }

        // get duration of each state type
        PORTAL.rma.state.duration (
          {log: reply.data.log}, function (err, state)
          {
          reply.data.log.forEach (
            function (log)
            {
            // skip process entries
            if (log.hasOwnProperty ("process"))
              return;

            var logNotice = language["RMA_STATE_" + log.state.toUpperCase () + "_NOTICE"];
            if (log.hasOwnProperty ("attachment"))
              logNotice = language.RMA_STATE_ATT;
            if (log.hasOwnProperty ("notice") && log.notice.length > 0)
              logNotice = log.notice;
            if (log.hasOwnProperty ("notice") && log.notice.indexOf ('RMA_STATE') > -1)
              logNotice = language[log.notice];

            var attGlyphicon = "glyphicon-picture";
            // set glyphicon of attachment
            if (log.hasOwnProperty ("attachment") &&
              log.attachment.hasOwnProperty ('content_type') &&
              log.attachment['content_type'].indexOf ('pdf') > -1)
              attGlyphicon = "glyphicon-pdf";

            PORTAL.rma.table["details"].row.add (
              {
                "delete": "",  //"<span class='glyphicon glyphicon-minus pointer del-sn'  data-toggle='tooltip' data-placement='auto' data-original-title='" + language.DEL_ENTRY + "'></span>",
                "state": "<div class='led " + PORTAL.rma.state.getLedColor (
                  {
                    state: state,
                    group: PORTAL.rma.getGroupById (options.groupId),
                    checkState: log.state
                  }) + "'></div><span id='rma-status'>" + language["RMA_STATE_" + log.state.toUpperCase ()] + "</span>",
                "date": moment.utc(log.stamp, "YYYY-MM-DD HH:mm:ss").local().format("YYYY-MM-DD HH:mm:ss"),
                "notice": "<span data-toggle='tooltip' data-placement='left' data-original-title='" + logNotice + "'>" + logNotice + "</span>",
                "user": (log.user) ? log.user : "",
                "attachment": (log.attachment == undefined) ? "<span class='glyphicon glyphicon-paperclip disabled'></span>" : "<span onclick='PORTAL.rma.attachment.get({ rmaId: " + options.rmaId + ", filename: \"" + log.attachment.filename + "\"});' class='pointer glyphicon " + attGlyphicon + "'></span>"
              });
            });
          });

        PORTAL.rma.table["details"].draw ();
        $ ("#rma-log-attachment-input").filestyle ({buttonText: language.RMA_SELECT_FILE});
        $("#rma-details_processing").hide();
        });
      },
    //----------------------------------------------------------------------------------------------------
    // add log entry to frontend table. save log entry at api
    //----------------------------------------------------------------------------------------------------
    add: function (options)
      {
      var log = {};
      log.state = (PORTAL.Authorization.group < 5) ? $ ('#rma-log-state').attr ('value') : $ ('#rma-log-state').val ();
      log.stamp = $ ('#rma-log-stamp').html ();
      log.notice = $ ('#rma-log-notice').val ();
      log.user = $ ('#rma-log-user').html ();
      log.attachment = $ ('#rma-log-attachment-input').val ();

      async.series (
        [
          function (onUpdateRma)
            {
            // update state of rma
            if (options.state != log.state)
              {
              // change rma state
              rm.call (
                "POST", "1/rma/" + options.rmaId + "/cn-state", {state: log.state}, function (status, reply)
                {
                if (status != 204)
                  onUpdateRma (language.RMA_CH_STATE_FAILURE);
                else
                  {
                  PORTAL.rma.table.reloadState (
                    {
                      cell: $ ('#rma-table .selected td:eq(2)'),
                      rmaId: options.rmaId,
                      groupId: options.groupId
                    });
                  onUpdateRma (null);
                  }
                });
              }
            else
              {
              setTimeout (
                function ()
                {
                onUpdateRma (null);
                }, 0);
              }
            },
          function (onUploadAttachment)
            {
            // upload rma attachment
            if (log.attachment.length != 0)
              {
              // check file type
              if (!allowedFileType (log.attachment))
                onUploadAttachment (language.FILETYPE_N_ALLOWED);

              var data = {};
              data.headers = {'notice': (log.notice) ? log.notice : "RMA_STATE_ATT"};
              data.formData = new window.FormData ($ ('#rma-log-attachment-form')[0]);
              rm.call (
                "POST", "1/rma/" + options.rmaId + "/attachment", data, function (status, reply)
                {
                if (status != 201)
                  onUploadAttachment (language.RMA_ADD_ATT_FAILURE);
                onUploadAttachment (null);
                });
              }
            else
              {
              setTimeout (
                function ()
                {
                onUploadAttachment (null);
                }, 0);
              }
            },
          function (onUploadNotice)
            {
            // upload rma notice
            if (log.attachment.length == 0 && log.notice.length != 0)
              {
              rm.call (
                "POST", "1/rma/" + options.rmaId + "/log", {notice: log.notice}, function (status, reply)
                {
                if (status != 204)
                  onUploadNotice (language.RMA_ADD_ATT_FAILURE);
                onUploadNotice ();
                });
              }
            else
              {
              setTimeout (
                function ()
                {
                onUploadNotice (null);
                }, 0);
              }
            }
        ],
        // optional callback
        function (err, results)
        {
        if (err)
          {
          PORTAL.modal.common ({ title: language.WARNING, message: err});
          return;
          }
        PORTAL.rma.log.load (options);
        });
      },

    //----------------------------------------------------------------------------------------------------
    // clear mask of frontend form
    //----------------------------------------------------------------------------------------------------
    clearForm: function ()
      {
      if (PORTAL.Authorization.group >= 5)
        $ ('#rma-log-state option:first').attr ('selected', 'selected');

      $ ('#rma-log-notice').val ("");
      $ ('#rma-log-attachment').val ("");
      $ ('#rma-log-stamp').html (moment.utc().format('YYYY-MM-DD HH:mm:ss'));
      }
  };

  //----------------------------------------------------------------------------------------------------
  // initialize data tables
  //----------------------------------------------------------------------------------------------------
  PORTAL.rma.table.initialize = {
    sn: function ()
      {
      PORTAL.rma.table.sn = $ ('#sn-table').DataTable (
        {
          paging: false,
          searching: false,
          ordering: false,
          info: false,
          lengthChange: false,
          processing: true,
          "columns": [
            {"data": "delete"},
            {"data": "sn"},
            {"data": "connection"},
            {"data": "sim"},
            {"data": "failure-desc"},
            {"data": "accessories-desc"}
          ],
          "aoColumnDefs": [
            {"sClass": "col-md-1", "aTargets": [0]},
            {"sClass": "col-md-2", "aTargets": [1]},
            {"sClass": "col-md-2", "aTargets": [2]},
            {"sClass": "col-md-2", "aTargets": [3]},
            {"sClass": "col-md-3", "aTargets": [4]},
            {"sClass": "col-md-2", "aTargets": [5]}
          ]
        });
      // clear table
      PORTAL.rma.table["sn"].clear ().draw ();
      },
    details: function ()
      {
      PORTAL.rma.table.details = $ ('#rma-details').DataTable (
        {
          paging: false,
          searching: false,
          bAutoWidth: false,
          "order": [[0, "desc"], [2, "desc"]],
          info: false,
          language: {
            "sEmptyTable": language.RMA_TABLE_DETAILS_EMPTY,
          },
          lengthChange: false,
          processing: true,
          "columns": [
            {"data": "delete"},
            {"data": "state"},
            {"data": "date"},
            {"data": "notice"},
            {"data": "user"},
            {"data": "attachment"}
          ],
          "aoColumnDefs": [
            {"sClass": "col-xs-1 nowrap-overflow-hidden", "aTargets": [0], "orderable": false,
              "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              $('[data-toggle="tooltip"]', nTd).tooltip ({container: 'body', html: true});}},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [1], "orderable": false},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [2], "orderable": false},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [3], "orderable": false,
              "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              $('[data-toggle="tooltip"]', nTd).tooltip ({container: 'body', html: true});}},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [4], "orderable": false},
            {"sClass": "col-xs-3 nowrap-overflow-hidden", "aTargets": [5], "orderable": false}
          ],
          columnDefs: [
            {type: 'text', targets: 0},
            {type: 'text', targets: 1},
            {type: 'de_date', targets: 2},
            {type: 'text', targets: 3},
            {type: 'text', targets: 4},
            {type: 'text', targets: 5}
          ]
        });
      },
    view: function ()
      {
      PORTAL.rma.table.view = $ ('#rma-table').DataTable (
        {
          processing: true,
          lengthChange: false,
          bAutoWidth: false,
          iDisplayLength: 5,
          dom: 'Bfrtip',
          buttons: [
            {
              extend:        'copy',
              exportOptions: { orthogonal: 'export' },
              text:          '<i class="fa fa-files-o"></i>',
              titleAttr:     'Copy'
            },
            {
              extend:        'excel',
              exportOptions: { orthogonal: 'export' },
              text:          '<i class="fa fa-file-excel-o"></i>',
              titleAttr:     'Excel'
            },
            {
              extend:        'csv',
              exportOptions: { orthogonal: 'export' },
              text:          '<i class="fa fa-file-text-o"></i>',
              titleAttr:     'CSV'
            },
            {
              extend:        'pdf',
              orientation: 'landscape',
              pageSize: 'LEGAL',
              exportOptions: { orthogonal: 'export' },
              text:          '<i class="fa fa-file-pdf-o"></i>',
              titleAttr:     'PDF',
            },
            {
              text:          '<i class="fa fa-file-code-o"></i>',
              titleAttr:     'JSON',
              action:        function ( e, dt, button, config ) {
                var data = dt.buttons.exportData();
                data = JSON.stringify(data.body).replace(/led-ok|led-warning|led-critical|led-gray|undefined/gi, "");

                $.fn.dataTable.fileSave(
                    new Blob([data]),
                    'rma.json'
                );
              }
            }
          ],
          language: {
            "lengthMenu": "Zeige _MENU_ Eintr&auml;ge pro Seite",
            "sInfoEmpty": "",
            "sInfo": "_START_ bis _END_ von _TOTAL_ Einträgen",
            "sEmptyTable": language.RMA_TABLE_EMPTY,
            "sInfoFiltered": "(gefiltert aus _MAX_ Eintr&auml;gen)",
            "search": "Suche:",
            "paginate": {
              "previous": "Zur&uuml;ck",
              "next": "Vor"
            }
          },
          "order": [[0, "desc"]],
          "columns": [
            {"data": "id"},
            {"data": "group"},
            {"data": "status", render: function (data, type, row)
              {
              if(type !== 'export')
                return data;

              return data.replace(/led-ok|led-warning|led-critical|led-gray|undefined/gi, "");
              }
            },
            {"data": "last-change-stamp"},
            {"data": "sn"},
            {"data": "process"}
          ],
          "aoColumnDefs": [
            {"sClass": "col-xs-1 nowrap-overflow-hidden", "aTargets": [0]},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [1]},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [2]},
            {"sClass": "col-xs-3 nowrap-overflow-hidden", "aTargets": [3]},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [4],
              "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              $('[data-toggle="tooltip"]', nTd).tooltip ({container: 'body', html: true});}},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [5],
              "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
            $('[data-toggle="tooltip"]', nTd).tooltip ({container: 'body', html: true});}}
          ]
        });


        $ ("#rma-table").dataTable ().columnFilter (
        {
          bUseColVis: true,
          sPlaceHolder: "head:before",
          aoColumns: [{type: "text"},
            {
              type: "select",
              values: _.pluck(PORTAL.Authorization.groups, 'name')
            },
            {
              type: "select",
              values: [language.RMA_STATE_NEW, language.RMA_STATE_CHECK, language.RMA_STATE_OFFER, language.RMA_STATE_PROGRESS, language.RMA_STATE_CLOSED]
            },
            {type: "date"},
            {type: "text"},
            {type: "text"}
          ]
        });

      $ ('#rma-table_filter').addClass ("hide");

      // deselect rma in table, due to enter filter
      PORTAL.rma.table.view.on('search.dt', function () {
        $ ('#rma-table tbody tr').removeClass ('selected');
        $ ('.scroll-area-details').addClass ('hide');
      });
      }
  };

  //----------------------------------------------------------------------------------------------------
  // KPI calculation
  //----------------------------------------------------------------------------------------------------

  PORTAL.rma.state = {
    duration: function (data, onCalcDuration)
      {

      if (data.log === undefined)
        return onCalcDuration ("log object of rma is not available");

      var state = {};
      PORTAL.rma.state.types.forEach (
        function (KpiType)
        {
        state[KpiType] = {stamp: getOldest (KpiType)};
        });

      calcDuration (state);
      onCalcDuration (null, state);

      function getOldest (type)
        {
        var momentOldest = moment ('2222-01-01');
        var compareMomentOldest = momentOldest;

        data.log.forEach (
          function (entry)
          {
          if (entry.state === type)
            {
            var momentLogStamp = moment.utc (entry.stamp, "YYYY-MM-DD HH:mm:ss");
            if (momentLogStamp.isBefore (momentOldest))
              momentOldest = moment (momentLogStamp);
            }
          });
        return (moment (momentOldest).isSame (compareMomentOldest)) ? false : momentOldest;
        };

      function calcDuration (state)
        {

        // calc duration of state new, check, offer, progress
        for (var i = 0; i < (PORTAL.rma.state.types.length - 1); i++)
          {
          if (state[PORTAL.rma.state.types[i]].stamp && state[PORTAL.rma.state.types[i + 1]].stamp)
            {
            state[PORTAL.rma.state.types[i]]["duration"] = state[PORTAL.rma.state.types[i + 1]].stamp.diff (state[PORTAL.rma.state.types[i]].stamp, 'hours');
            }
          else if (state[PORTAL.rma.state.types[i]].stamp)
            {
            state[PORTAL.rma.state.types[i]]["duration"] = (moment ().utc ()).diff (state[PORTAL.rma.state.types[i]].stamp, 'hours');
            }

          // reset negative duration value
          // negative values can be produced by the help of manual state changes
          if (state[PORTAL.rma.state.types[i]]["duration"] < 0)
            state[PORTAL.rma.state.types[i]]["duration"] = 0;
          }

        // calc total duration
        if (state[PORTAL.rma.state.types[0]].stamp && state[PORTAL.rma.state.types[PORTAL.rma.state.types.length - 1]].stamp)
          state[PORTAL.rma.state.types[PORTAL.rma.state.types.length - 1]]["duration"] = state[PORTAL.rma.state.types[PORTAL.rma.state.types.length - 1]].stamp.diff (state[PORTAL.rma.state.types[0]].stamp, 'hours');
        };
      },
    getLedColor: function (options)
      {
      if (options.state == undefined || options.checkState == undefined)
        return "led-gray";
      if (options.state[options.checkState].duration >= options.group["t_rma_" + options.checkState + "_warning"])
        return "led-critical";
      if (options.state[options.checkState].duration >= options.group["t_rma_" + options.checkState + "_ok"])
        return "led-warning";
      return "led-ok";
      }
  };

  PORTAL.rma.state.types = ["new", "check", "offer", "progress", "closed"];

  //----------------------------------------------------------------------------------------------------
  // setup tooltip options. show tooltip in front
  //----------------------------------------------------------------------------------------------------
  PORTAL.setupTooltip = function ()
    {
    $ ('[data-toggle="tooltip"]').tooltip ({container: 'body', html: true});
    };

  //----------------------------------------------------------------------------------------------------
  // contract opertations
  //----------------------------------------------------------------------------------------------------
  PORTAL.contract = {
    //----------------------------------------------------------------------------------------------------
    // show mask: check contract
    //----------------------------------------------------------------------------------------------------
    nextCheckInput: function ()
      {
      // check input
      if (PORTAL.Authorization.groups.length > 1)
        {
        // check group selected
        if (!$ ('#contract-group').val ())
          return PORTAL.modal.common ({title: language.WARNING, message: language.MISSING_FIELD});
        }

      // change wizard
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.contract-step-2' : '.contract-step-1').removeClass ('active');
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.contract-step-3' : '.contract-step-3').removeClass ('disabled');
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.contract-step-2' : '.contract-step-1').addClass ('complete');
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.contract-step-3' : '.contract-step-3').addClass ('active');

      // show sn input's
      $ ('.form-group-add-sn').removeClass("hide");

      $ ('.required-info').addClass("hide");

      // disable form input fields
      $ ('.form-control').attr ("disabled", "disabled");
      // disable tokenfields
      $('#contract-emails-reminder').tokenfield('disable');
      $('#contract-emails-alarming').tokenfield('disable');

      // show form labels
      $ ('.form-group-labels').removeClass("hide");

      // hide buttons
      $ ((PORTAL.Authorization.groups.length > 1) ? '.btn-group-step-2' : '.btn-group-step-1').addClass ('hide');

      // show save buttons
      $ ('.btn-group-step-3').removeClass ('hide');
      },
    //----------------------------------------------------------------------------------------------------
    // show mask: select groups
    //----------------------------------------------------------------------------------------------------
    nextSelectGroup: function ()
      {
      PORTAL.contract.checkInputs( function (err)
        {
        if(err)
          return;
        
        // change wizard
        $ ('.contract-step-1').removeClass ('active');
        $ ('.contract-step-2').removeClass ('disabled');
        $ ('.contract-step-1').addClass ('complete');
        $ ('.contract-step-2').addClass ('active');

        // hide input sn
        $ ('.form-group-add-sn').addClass ('hide');

        // show group selection
        $ ('.form-group-select-group').removeClass ('hide');

        // hide buttons
        $ ('.btn-group-step-1').addClass ('hide');
        // show save buttons
        $ ('.btn-group-step-2').removeClass ('hide');
        });
      },      
    //----------------------------------------------------------------------------------------------------
    // show mask: check contract
    //----------------------------------------------------------------------------------------------------
    backInputSerial: function ()
      {
      // change wizard
      $ ('.contract-step-2').removeClass ('active');
      $ ('.contract-step-1').removeClass ('disabled');
      $ ('.contract-step-2').addClass ('disabled');
      $ ('.contract-step-1').addClass ('active');

      // hide group selection
      $ ('.form-group-select-group').addClass ('hide');

      $ ('.required-info').removeClass("hide");

      // hide input sn
      $ ('.form-group-add-sn').removeClass('hide');

      // buttons
      $ ((PORTAL.Authorization.groups.length > 1 ) ? '.btn-group-step-2' : '.btn-group-step-3').addClass ('hide');
      $ ('.btn-group-step-1').removeClass ('hide');
      },
    //----------------------------------------------------------------------------------------------------
    // show check contract mask
    //----------------------------------------------------------------------------------------------------
    backSelectGroup: function ()
      {
      // change wizard
      $ ('.contract-step-2').addClass ('active');
      $ ('.contract-step-3').addClass ('disabled');
      $ ('.contract-step-2').removeClass ('complete');
      $ ('.contract-step-3').removeClass ('active');

      // enable form input fields
      $ ('.form-control').removeAttr ("disabled");
      $('#contract-emails-reminder').tokenfield('enable');
      $('#contract-emails-alarming').tokenfield('enable');

      // hide sn add fields
      $ ('.form-group-add-sn').addClass("hide");

      // show form labels
      $ ('.form-group-labels').addClass("hide");

      // buttons
      $ ('.btn-group-step-2').removeClass ('hide');
      $ ('.btn-group-step-3').addClass ('hide');
      },
    //----------------------------------------------------------------------------------------------------
    // load groups
    //----------------------------------------------------------------------------------------------------
    loadGroups: function ()
      {
      if (PORTAL.Authorization.groups.length <= 1)
        {
        $ ('#contract-group').append ($ ("<option selected></option>").attr ("value", PORTAL.Authorization.groups[0]._uid).text (PORTAL.Authorization.groups[0].name));
        return;
        }

      $ ('#contract-group').parent ().parent ().removeClass ("hidden");

      PORTAL.Authorization.groups.forEach (
        function (group)
        {
        $ ('#contract-group').append ($ ("<option></option>").attr ("value", group._uid).text (group.name));
        });
      },
    //----------------------------------------------------------------------------------------------------
    // save contract
    //----------------------------------------------------------------------------------------------------
    save: function ()
      {
       // change wizard
       $ ((PORTAL.Authorization.groups.length > 1 ) ? '.contract-step-3' : '.contract-step-3').removeClass ('active');
       $ ('.contract-step-4').removeClass ('disabled');
       $ ((PORTAL.Authorization.groups.length > 1 ) ? '.contract-step-3' : '.contract-step-3').addClass ('complete');
       $ ('.contract-step-4').addClass ('complete');

       // set header values
       PORTAL.modal.progressBar ({title: language.CONTRACT_PROCESSING});

       var group = (PORTAL.Authorization.groups.length > 1) ? PORTAL.contract.getGroupById($ ('#contract-group').val ()) : PORTAL.Authorization.groups[0];

       var json = {
         device: {
           sn: $ ('#contract-sn').val()
         },
         period: parseInt($ ('#contract-period').val()),
         insurance: ($ ('#contract-insurance').val() == "true"),
         email: {
           remind: $ ('#contract-emails-reminder').val(),
           alarm: $ ('#contract-emails-alarming').val()
         }
       };

       if($('#contract-start-date').val().length)
        json["stamp"] = $('#contract-start-date').val();

       json["serviceInterval"] = ($('#contract-serviceinterval').val().length) ? $('#contract-serviceinterval').val() : group.t_contract_serviceinterval;

       rm.open (PORTAL.Authorization.string, PORTAL.Authorization.host);
       rm.call (
       "POST", "1/groups/" + group.group_id + "/contracts", json , function (status, reply)
       {
       if (status === 200)
        window.location.href = "/contract/view";
       else if (status === 400)
        PORTAL.modal.common ({ title: language.FAILURE, message: reply.err});
       else
        PORTAL.modal.common ({ title: language.FAILURE, message: language.RMA_SAVE_STD_FAILURE});
       });
      },
    getGroupById: function (groupId)
      {
      for (var i = 0; i < PORTAL.Authorization.groups.length; i++)
        {
        if (PORTAL.Authorization.groups[i]._uid == groupId)
          {
          return PORTAL.Authorization.groups[i];
          }
        }
      return {};
      },
    checkInputs: function (onCheckInputs)
      {
      // check input fields
      if (!$ ('#contract-period').val() ||
        $ ('#contract-sn').val().length == 0)
        {         
        PORTAL.modal.common ({title: language.WARNING, message: language.MISSING_FIELD});
        return onCheckInputs({ err: language.MISSING_FIELD});
        }

      // check email token fields
      if ($ ('.tokenfield > .invalid').length != 0)
        {         
        PORTAL.modal.common ({title: language.WARNING, message: language.INVALID_MAIL});
        return onCheckInputs({ err: language.INVALID_MAIL});
        }

      // check sn of device
      if (!$ ('#contract-sn-icon').hasClass('glyphicon-ok'))
        {
        PORTAL.modal.common ({title: language.WARNING, message: language.MISSING_FIELD});
        return onCheckInputs({ err: language.MISSING_FIELD});
        }

      // check sn is alread used
      PORTAL.contract.sn.isNotInUse($ ('#contract-sn').val (), function (err) {
        if(err)
          {
          PORTAL.modal.common ({title: language.WARNING, message: language.SN_ALREADY_IN_USE});
          return onCheckInputs({ err: language.SN_ALREADY_IN_USE});
          }
        return onCheckInputs();
      });
      },
    data : [ ],
    getData : function(onData)
      {
      PORTAL.contract.data = [];
      rm.open (PORTAL.Authorization.string, PORTAL.Authorization.host);
      rm.call (
        "GET", "ext/contracts", {}, function (status, contracts)
        {
        if (status === 400)
          return onData (language.ERROR_SERVERGROUP);

        if (status === 500)
          return onData (language.ERROR_INTERNAL);

        PORTAL.contract.data = contracts;

        // load calibrations
        for (var contract in PORTAL.contract.data)
          {
          // get contract period state
          PORTAL.contract.data[contract].data["state"] = {contract: PORTAL.contract.getPeriodState({contract: PORTAL.contract.data[contract]})};

          // check calibration interval
          if (PORTAL.contract.data[contract].hasOwnProperty('log'))
            {
            // drop log entries event_type not equal "calibration"
            var calibrations = _.filter(
              PORTAL.contract.data[contract].log, function (log)
              {
              if (log.event_type == "calibration") return log
              });

            // sort entries
            calibrations = _.sortBy(calibrations, 'stamp');

            // continue on empty calibrations log
            if (!calibrations.length)
              continue;

            // check interval
            for (var i = 0; i < calibrations.length; i++)
              {
              var lastStamp;

              // get last stamp
              if (i == 0)
              // take stamp from contract assignment
                lastStamp = moment.utc(PORTAL.contract.data[contract].header["stamp"]);
              else
              // take stamp from last calibration
                lastStamp = moment.utc(calibrations[i - 1].stamp);

              // set state of calibration
              PORTAL.contract.data[contract].log = _.map(
                PORTAL.contract.data[contract].log, function (log)
                {
                if (log.id == calibrations[i].id)
                  {
                  log["state"] = ( moment (lastStamp).add(PORTAL.contract.data[contract].data.serviceInterval, 'months').subtract(PORTAL.contract.data[contract].group.t_contract_remindinterval, 'days').isBefore(calibrations[i].stamp)) ? "warning" : "ok";
                  log["state"] = ( moment (lastStamp).add(PORTAL.contract.data[contract].data.serviceInterval, 'months').isBefore(calibrations[i].stamp)) ? "critical" : log["state"];
                  }
                return log;
                });
              }

            // set current calibration state
            PORTAL.contract.data[contract].data.state["calibration"] = (moment (calibrations[calibrations.length - 1].stamp).add(PORTAL.contract.data[contract].data.serviceInterval, 'months').subtract(PORTAL.contract.data[contract].group.t_contract_remindinterval, 'days').isBefore(moment.utc())) ? "warning" : "ok";
            if (moment (calibrations[calibrations.length - 1].stamp).add(PORTAL.contract.data[contract].data.serviceInterval, 'months').isBefore(moment.utc()))
              PORTAL.contract.data[contract].data.state.calibration = "critical";
            }
          }
        onData ();
        });
      },
    getPeriodState: function (options)
      {
      // get contract period state
      var state = (moment (options.contract.header.stamp).add(options.contract.data.period , 'months').subtract(options.contract.group.t_contract_remindinterval, 'days').isBefore(moment.utc())) ? "warning" : "ok";
      if((moment (options.contract.header.stamp).add(options.contract.data.period , 'months').isBefore(moment.utc())))
        state = "critical";

      return state;
      },
    getById: function( options )
      {
      for( contract in PORTAL.contract.data)
        {
        if (PORTAL.contract.data[contract].header.UID == options.id)
          {
          return PORTAL.contract.data[contract];
          }
        }
      return false;
      },
    modify: function (options) {
      var action = $('#contract-change-action').val();

      if(!action)
        return;

      switch(action)
      {
        case 'insurance' :
          PORTAL.modal.addInsurance(options);
          break;
        case 'extend' :
          PORTAL.modal.extendContract(options);
          break;
        case 'end' :
          PORTAL.modal.endContract(options);
          break;
        case 'email' :
          PORTAL.modal.changeMail(options);
          break;
      }
    }
  };

  PORTAL.contract.calibration = {
    //----------------------------------------------------------------------------------------------------
    // load log of rma
    //----------------------------------------------------------------------------------------------------
    load: function (options)
      {
      $ ("#contract-calibration_processing").show ();
      // clear table details
      PORTAL.contract.table["calibration"].clear ().draw ();

      $ ('.scroll-area-contract-calibrations').removeClass ('hide');
      $ ('.details-conract-nr').html (options.id);

      var contract = PORTAL.contract.getById (options);

      // add modification line
      PORTAL.contract.table["calibration"].row.add (
        {
          "modify": "<span class='glyphicon glyphicon-cog pointer text-left' onclick='PORTAL.contract.modify(" + JSON.stringify (options) + ");'></span>",
          "state_action": "<select class='form-control' id='contract-change-action'><option value='none' selected disabled style='display: none;'>" + language.SELECT_ACTION + "</option><option value='extend'>" + language.CONTRACT_EXTEND_END + "</option>" + ((contract.data.insurance) ? "" : "<option value='insurance'>" + language.INSURANCE_ADD + "</option>") + "<option value='email'>" + language.CHANGE_EMAILS + "</option><option value='end'>" + language.END + "</option></select>",
          "stamp": "<div class='text-left'>" + moment ().format ("YYYY-MM-DD HH:mm:ss") + "</div>",
          "user": "<div class='text-left'>" + PORTAL.Authorization.user + "</div>",
          "details": "<div class='text-left'><span class='wanly'>" + language.CONTRACT_MODIFY + "</span></div>"
        }).draw ();

      // hide processing
      $ ("#contract-calibration_processing").hide ();

      if (contract.hasOwnProperty ('log'))
        {
        for (log in contract.log)
          {
          var logHtml = PORTAL.contract.calibration.getHtmlText (contract.log[log]);

          if (!logHtml.action.length || !logHtml.details.length)
            continue;

          PORTAL.contract.table["calibration"].row.add (
            {
              "modify": "",
              "state_action": logHtml.action,
              "stamp": moment.utc (contract.log[log].stamp, "YYYY-MM-DD HH:mm:ss").local ().format ("YYYY-MM-DD HH:mm:ss"),
              "user": (contract.log[log].user) ? contract.log[log].user : language.SYSTEM,
              "details": logHtml.details
            });
          }
        PORTAL.contract.table["calibration"].draw ();
        }
      },
    getHtmlText: function (log)
      {
      var returnObject = {action: "", details: ""};
      if (log.hasOwnProperty ("type"))
        {
        switch (log.type)
        {
          case 'new':
            returnObject = {
              action: language.CONTRACT_NEW,
              details: language.CONTRACT_NEW_DETAILS + " <b>" + language.CONTRACT_END + "</b>: " + config.contract.periods[log.period] + ", <b>" + language.CONTRACT_INSURANCE + "</b>: " + ((log.insurance) ? language.YES : language.NO ) + ", <b>" + language.CONTRACT_SERVICEINTERVAL + "</b>: " + config.contract.serviceInterval[log.serviceInterval]
            };
            break;
          case 'modify':
            if (log.hasOwnProperty ("insurance") && log.insurance == true)
              returnObject = {action: language.INSURANCE_DONE, details: language.INSURANCE_DONE_DETAILS};

            if (log.hasOwnProperty ("period"))
              returnObject = {
                action: language.CONTRACT_EXTENDED,
                details: language.CONTRACT_EXTENDED_DETAILS1 + " " + log.period + " " + language.MONTHS + " " + language.CONTRACT_EXTENDED_DETAILS2
              };

            if (log.hasOwnProperty ("email") && log.email.hasOwnProperty ("remind") && log.email.hasOwnProperty ("alarm"))
              returnObject = {
                action: language.MAIL_MODIFIED,
                details: "<b>" + language.CONTRACT_REMINDER_EMAILS + "</b>: " + log.email.remind + ". <b>" + language.CONTRACT_ALARMING_EMAILS + "</b>: " + log.email.alarm
              };
              
            if (log.hasOwnProperty ("end"))
              returnObject = {
                action: language.CONTRACT_ENDED,
                details: language.CONTRACT_ENDED_DETAILS1 + " " + moment.utc (log.end, "YYYY-MM-DD HH:mm:ss").local ().format ("YYYY-MM-DD") + " " + language.CONTRACT_ENDED_DETAILS2
              };

            break;
        }

        if (returnObject.action.length && returnObject.details.length)
          return {
            action: "<span data-toggle='tooltip' data-placement='right' data-original-title='" + returnObject.action + "'>" + returnObject.action + "</span>",
            details: "<span data-toggle='tooltip' data-placement='left' data-original-title='" + returnObject.details + "'>" + returnObject.details + "</span>"
          }
        }

      if (log.hasOwnProperty ('event_type') && log["event_type"] == "calibration")
        {
        if (log.hasOwnProperty ('attachments'))
          {
          (Object.keys (log.attachments)).forEach (
            function (attachment)
            {
            returnObject.details += "<a href='#' onclick='PORTAL.cv.attachment.get({ cv: \"" + log.id + "\", sn: \"" + log.sn + "\", filename: \"" + log.attachments[attachment].filename + "\"});'><span class='pointer glyphicon glyphicon-pdf'></span>" + language.CALIBRATION_PROTOCOL + "</a>"
            });
          }
        else
          returnObject.details = "<span class='glyphicon glyphicon-paperclip disabled'></span>";

        returnObject.action = (log.sn) ? "<div class='led led-" + log.state + "'></div>" + log.sn : ""
        }
      return {action: returnObject.action, details: returnObject.details};
      }
  };

  PORTAL.contract.notice = {
   save: function(options)
     {
     // save/update notice
     rm.call (
       "PUT", "1/groups/" + options.groupId + "/contracts/" + options.contractId, {notice: options.value}, function (status)
       {
       if (status != 204)
         return;

       $ ('.notice[data-contract-id=' + options.contractId + ']').html ((options.value.length) ? options.value : "<span class='wanly editable'>" + language.EMPTY + "</span>");
       $ ('.notice[data-contract-id=' + options.contractId + ']').data('value', options.value);
       $ ('.notice[data-contract-id=' + options.contractId + ']').attr('data-original-title', options.value);
       });
     }
  };

  PORTAL.contract.sn = {
    isValid: function ()
      {
      PORTAL.sn.isValid(
        {sn: $ ('#contract-sn').val ()}, function (err)
        {
        if (err)
          {
          $ ('#contract-sn-icon').addClass("glyphicon-remove");
          $ ('#contract-sn-icon').parent().addClass("has-error");
          $ ('#contract-sn-icon').removeClass("glyphicon-ok");
          $ ('#contract-sn-icon').parent().removeClass("has-success");
          }
        else
          {
          $ ('#contract-sn-icon').addClass("glyphicon-ok");
          $ ('#contract-sn-icon').parent().addClass("has-success");
          $ ('#contract-sn-icon').removeClass("glyphicon-remove");
          $ ('#contract-sn-icon').parent().removeClass("has-error");
          }
        });
      },
    isNotInUse: function (sn, onCheck) {
      PORTAL.contract.getData(function (err) {
        if (err)
          return onCheck(err);

        PORTAL.contract.data.forEach(function (contract) {
          if (contract.data.hasOwnProperty("device") &&
              contract.data.device.hasOwnProperty("sn") &&
              contract.data.device.sn == sn)
            return onCheck({err: "SN is already in use."});
        });
        onCheck();
      });
    }
  };

  PORTAL.contract.end = {
    //----------------------------------------------------------------------------------------------------
    // calculate end of contract
    //----------------------------------------------------------------------------------------------------
    calculate: function (options)
      {
      var momentStamp = moment.utc (options.contract.header.stamp, "YYYY-MM-DD HH:mm:ss");
      momentStamp.add(options.contract.data.period, 'M');
      return momentStamp.format("YYYY-MM-DD HH:mm:ss");
      }
  };

  PORTAL.contract.table = {
    //----------------------------------------------------------------------------------------------------
    // load contract table
    //----------------------------------------------------------------------------------------------------
    load: function ()
      {
      $ ("#contract-table_processing").show ();

      if (PORTAL.Authorization.groups.length <= 1)
      // set groups invisible, due to user has only 1 group
        PORTAL.contract.table["view"].column (1).visible (false);

      PORTAL.contract.getData (
        function (err)
        {
        if (err)
          return PORTAL.modal.common ({title: language.FAILURE, message: err});

        PORTAL.contract.data.forEach (
          function (contract)
          {
          if(contract.data.hasOwnProperty("end"))
            // contract has already ended -> don't show at service portal
            return;

          var notice = (contract.data.hasOwnProperty ('notice')) ? contract.data.notice : "";
          var calibrationStamp = moment (0);

          for (log in contract.log)
            {
            if (contract.log[log].event_type != "calibration")
              continue;

            if ((moment (contract.log[log].stamp)).isAfter (calibrationStamp))
              calibrationStamp = moment (contract.log[log].stamp);
            }

          PORTAL.contract.table["view"].row.add (
            {
              "id": "<span id='contract-id' contract-id='" + contract.header.UID + "' contract-sn='" + ((contract.data.hasOwnProperty('device') && contract.data.device.hasOwnProperty('sn')) ? contract.data.device.sn : "") + "'>" + contract.header.UID + "</span>",
              "group": "<span>" + contract.group.name + "</span>",
              "contract_stamp": moment.utc (contract.header.stamp, "YYYY-MM-DD HH:mm:ss").local ().format ("YYYY-MM-DD"),
              "contract_end": "<span class='hidden'>" + contract.data.state.contract + "</span><div class='led led-" + contract.data.state.contract + "'></div>" + moment.utc (PORTAL.contract.end.calculate ({contract: contract}), "YYYY-MM-DD HH:mm:ss").local ().format ("YYYY-MM-DD"),
              "insurance": "<span class='glyphicon " + ((contract.data.insurance) ? "glyphicon-ok-sign" : "glyphicon-remove-sign") + "' aria-hidden='true'></span><span class='hide'>" + ((contract.data.insurance) ? language.YES : language.NO) + "</span>",
              "sn": ((contract.data.hasOwnProperty('device') && contract.data.device.hasOwnProperty('sn')) ? "<span class='hidden'>" + contract.data.state.calibration + "</span><div class='led led-" + contract.data.state.calibration + "'></div><span data-original-title='" + contract.data.device.sn + " / " + ((contract.data.device.hasOwnProperty("parentSn")) ? contract.data.device.parentSn : "-")  + "' data-toggle='tooltip' data-placement='auto' >" + contract.data.device.sn + " / " + ((contract.data.device.hasOwnProperty("parentSn")) ? contract.data.device.parentSn : "-") + "</span>" : ""),
              "calibration_stamp": (calibrationStamp.isSame (moment (0))) ? "<span class='wanly'>" + language.EMPTY + "</span>" : calibrationStamp.format ("YYYY-MM-DD"),
              "notice": "<span class='notice editable' data-contract-id='" + contract.header.UID + "' data-group-id='" + contract.group.group_id + "' data-value='" + notice + "' data-placeholder='" + language.CONTRACT_NOTICE + "'  data-toggle='tooltip' data-placement='auto' data-original-title='" + notice + "' onclick='PORTAL.modal.editText(this, function (options) { PORTAL.contract.notice.save(options);});'>" + ((notice.length) ? notice : "<span class='wanly'>" + language.EMPTY + "</span>") + "</span>"
            });
          });
        PORTAL.contract.table["view"].draw ();
        $ ("#contract-table_processing").hide ();
        });
      },
    //----------------------------------------------------------------------------------------------------
    // reload insurance of contract
    //----------------------------------------------------------------------------------------------------
    reloadInsurance: function (options)
      {
      options.cell.html ("<span class='glyphicon " + ((options.insurance) ? "glyphicon-ok-sign" : "glyphicon-remove-sign") + "' aria-hidden='true'></span><span class='hide'>" + ((options.insurance) ? language.YES : language.NO) + "</span>");
      },
    //----------------------------------------------------------------------------------------------------
    // reload period of contract
    //----------------------------------------------------------------------------------------------------
    reloadPeriod: function (options)
      {
      options.cell.html ("<div class='led led-" + PORTAL.contract.getPeriodState(options) + "'></div>" + moment.utc (PORTAL.contract.end.calculate (options), 'YYYY-MM-DD HH:mm:ss').local ().format ('YYYY-MM-DD'));
      }
  };
  //----------------------------------------------------------------------------------------------------
  // initialize data tables of contract sites
  //----------------------------------------------------------------------------------------------------
  PORTAL.contract.table.initialize = {
    calibration: function ()
      {
      PORTAL.contract.table.calibration = $ ('#contract-calibration').DataTable (
        {
          paging: false,
          searching: false,
          bAutoWidth: false,
          "order": [[0, "desc"], [2, "desc"]],
          info: false,
          language: {
            emptyTable: language.CALIBRATION_TABLE_EMPTY
          },
          lengthChange: false,
          processing: true,
          "columns": [
            {"data": "modify"},
            {"data": "state_action"},
            {"data": "stamp"},
            {"data": "user"},
            {"data": "details"}
          ],
          "aoColumnDefs": [
            {"sClass": "col-xs-1 nowrap-overflow-hidden", "aTargets": [0], "orderable": false},
            {"sClass": "col-xs-3 nowrap-overflow-hidden", "aTargets": [1], "orderable": false,
              "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              $('[data-toggle="tooltip"]', nTd).tooltip ({container: 'body', html: true});}},
            {"sClass": "col-xs-3 nowrap-overflow-hidden", "aTargets": [2], "orderable": false},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [3], "orderable": false},
            {"sClass": "col-xs-3 nowrap-overflow-hidden", "aTargets": [4], "orderable": false,
              "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              $('[data-toggle="tooltip"]', nTd).tooltip ({container: 'body', html: true});}}
          ],
          columnDefs: [
            {type: 'text', targets: 0},
            {type: 'text', targets: 1},
            {type: 'date', targets: 2},
            {type: 'text', targets: 3},
            {type: 'text', targets: 4}
          ]
        });
      },
    view: function ()
      {
      PORTAL.contract.table.view = $ ('#contract-table').DataTable (
        {
          processing: true,
          lengthChange: false,
          bAutoWidth: false,
          iDisplayLength: 5,
          dom: 'Bfrtip',
          buttons: [
            {
              extend:        'copy',
              exportOptions: { orthogonal: 'export' },
              text:          '<i class="fa fa-files-o"></i>',
              titleAttr:     'Copy'
            },
            {
              extend:        'excel',
              exportOptions: { orthogonal: 'export' },
              text:          '<i class="fa fa-file-excel-o"></i>',
              titleAttr:     'Excel'
            },
            {
              extend:        'csv',
              exportOptions: { orthogonal: 'export' },
              text:          '<i class="fa fa-file-text-o"></i>',
              titleAttr:     'CSV'
            },
            {
              extend:        'pdf',
              orientation: 'landscape',
              pageSize: 'LEGAL',
              exportOptions: { orthogonal: 'export' },
              text:          '<i class="fa fa-file-pdf-o"></i>',
              titleAttr:     'PDF'
            },
            {
              text:          '<i class="fa fa-file-code-o"></i>',
              titleAttr:     'JSON',
              action:        function ( e, dt, button, config ) {
                var data = dt.buttons.exportData();
                data = JSON.stringify(data.body).replace(/ok|warning|critical|gray|undefined/gi, "");
                $.fn.dataTable.fileSave(
                    new Blob([data]),
                    'rma.json'
                );
              }
            }
          ],
          language: {
            "emptyTable": language.CONTRACT_TABLE_EMPTY,
            "lengthMenu": "Zeige _MENU_ Eintr&auml;ge pro Seite",
            "sInfoEmpty": "Keine Daten vorhanden",
            "sInfo": "_START_ bis _END_ von _TOTAL_ Einträgen",
            "sEmptyTable": "Keine Daten in der Tabelle vorhanden",
            "sInfoFiltered": "(gefiltert aus _MAX_ Eintr&auml;gen)",
            "search": "Suche:",
            "paginate": {
              "previous": "Zur&uuml;ck",
              "next": "Vor"
            }
          },
          "order": [[0, "desc"]],
          "columns": [
            {"data": "id"},
            {"data": "group"},
            {"data": "contract_stamp"},
            {"data": "contract_end", render: function (data, type)
            {
              if(type !== 'export')
                return data;

              return data.replace(/ok|warning|critical|gray|undefined/gi, "");
            }
            },
            {"data": "insurance"},
            {"data": "sn", render: function (data, type)
            {
              if(type !== 'export')
                return data;

              return data.replace(/ok|warning|critical|gray|undefined/gi, "");
            }
            },
            {"data": "calibration_stamp"},
            {"data": "notice"}
          ],
          "aoColumnDefs": [
            {"sClass": "col-xs-1 nowrap-overflow-hidden", "aTargets": [0]},
            {"sClass": "col-xs-1 nowrap-overflow-hidden", "aTargets": [1]},
            {"sClass": "col-xs-1 nowrap-overflow-hidden", "aTargets": [2]},
            {"sClass": "col-xs-1 nowrap-overflow-hidden", "aTargets": [3]},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [4]},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [5],
              "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              $('[data-toggle="tooltip"]', nTd).tooltip ({container: 'body', html: true});}},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [6]},
            {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [7],
              "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
              $('[data-toggle="tooltip"]', nTd).tooltip ({container: 'body', html: true});}}
          ]
        });

      $ ("#contract-table").dataTable ().columnFilter (
        {
          bUseColVis: true,
          sPlaceHolder: "head:before",
          aoColumns: [{type: "text"},
            {
              type: "select",
              values: _.pluck(PORTAL.Authorization.groups, 'name')
            },
            {type: "date"},
            {type: "text"},
            {
              type: "select",
              values: [language.YES, language.NO]
            },
            {type: "text"},
            {type: "text"},
            {type: "text"}
          ]
        });

      $ ('#contract-table_filter').addClass ("hide");

      // deselect contract in table, due to enter filter
      PORTAL.contract.table.view.on('search.dt', function () {
        $ ('#contract-table tbody tr').removeClass ('selected');
        $ ('.scroll-area-contract-calibrations').addClass ('hide');
      });
      }
  };
  }

 //----------------------------------------------------------------------------------------------------
 // simstat opertations
 //----------------------------------------------------------------------------------------------------
 PORTAL.simstat = { };

 PORTAL.simstat.table = {
   //----------------------------------------------------------------------------------------------------
   // load simstat table
   //----------------------------------------------------------------------------------------------------
   load: function ()
     {
     $ ("#simstat-table_processing").show ();

     rm.open (PORTAL.Authorization.string, PORTAL.Authorization.host);
     rm.call (
       "GET", "1/clearing/sim-aberration", {}, function (status, reply)
       {
       if (status != 200)
         return PORTAL.modal.common ({title: language.FAILURE, message: reply.err});

       var htmlEmpty = "<span class='wanly editable'>" + language.EMPTY + "</span>";

       reply.forEach (
         function (row)
         {
         if (!row.hasOwnProperty("bytesProvider"))
           return;

         var provider = htmlEmpty,
           bytesProvider = htmlEmpty,
           arrayProvider = [];

         arrayProvider = _.keys(row.bytesProvider);
         provider = arrayProvider.join().toLocaleUpperCase();
         bytesProvider = _.values(row.bytesProvider).join();

         if(!row.hasOwnProperty('bytesAppliance'))
          row['bytesAppliance'] = 0;

         PORTAL.simstat.table["view"].row.add (
           {
             "imsi" : ((row.hasOwnProperty('imsi')) ? row.imsi : htmlEmpty),
             "month" : row.month.slice(4,6) + "-" + row.month.slice(0,4),
             "server": ((row.hasOwnProperty('applianceId')) ? row.applianceId : htmlEmpty),
             "customer": ((row.hasOwnProperty('customerId') && row.customerId.length > 0) ? row.customerId : htmlEmpty),
             "provider": provider,
             "bytesProvider": filesize(bytesProvider, {base: 10}),
             "bytesAppliance": filesize(row.bytesAppliance, {base: 10}),
             "difference" : filesize(bytesProvider - row.bytesAppliance, {base: 10})
           });
         });

       PORTAL.simstat.table["view"].draw ();
       $ ("#simstat-table_processing").hide ();
       });
     }
 };


 //----------------------------------------------------------------------------------------------------
 // initialize data tables of simstat
 //----------------------------------------------------------------------------------------------------
 PORTAL.simstat.table.initialize = {
   view: function ()
     {
     PORTAL.simstat.table.view = $ ('#simstat-table').DataTable (
       {
         processing: true,
         lengthChange: false,
         bAutoWidth: false,
         iDisplayLength: 10,
         language: {
           "emptyTable": language.CONTRACT_TABLE_EMPTY,
           "lengthMenu": "Zeige _MENU_ Eintr&auml;ge pro Seite",
           "sInfoEmpty": "Keine Daten vorhanden",
           "sInfo": "_START_ bis _END_ von _TOTAL_ Einträgen",
           "sEmptyTable": "Keine Daten in der Tabelle vorhanden",
           "sInfoFiltered": "(gefiltert aus _MAX_ Eintr&auml;gen)",
           "search": "Suche:",
           "paginate": {
             "previous": "Zur&uuml;ck",
             "next": "Vor"
           }
         },
         "order": [[0, "desc"]],
         "columns": [
           {"data": "imsi"},
           {"data": "month"},
           {"data": "server"},
           {"data": "customer"},
           {"data": "provider"},
           {"data": "bytesProvider",  type: 'file-size'},
           {"data": "bytesAppliance",  type: 'file-size'},
           {"data": "difference",  type: 'file-size'}
         ],
         "aoColumnDefs": [
           {"sClass": "col-xs-1 nowrap-overflow-hidden", "aTargets": [0]},
           {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [1]},
           {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [2]},
           {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [3]},
           {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [4]},
           {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [5]},
           {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [6]},
           {"sClass": "col-xs-2 nowrap-overflow-hidden", "aTargets": [7]}
         ]
       });

     $ ('#simstat-table_filter').addClass ("hide");

     $ ("#simstat-table").dataTable ().columnFilter (
       {
         bUseColVis: true,
         sPlaceHolder: "head:before",
         aoColumns: [
           {type: "text"},
           {type: "text"},
           {type: "text"},
           {type: "text"},
           {type: "text"},
           {type: "text"},
           {type: "text"},
           {type: "text"}
         ]
       });
     }
 };


 function allowedFileType(file)
  {
  var allowedEOF = ["jpg", "pdf", "png", "gif"];
  var arrFile = file.split('.');
  return (allowedEOF.indexOf(arrFile[arrFile.length-1].toLowerCase()) > -1 ) ? true : false;
  };
